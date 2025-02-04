interface SkuComponents {
  categoryCode: string;
  year: number;
  correlativeProduct: number;
  correlativeProductVariant: number;
}

interface VariationAttributeResult {
  productVariationId: string;
  attributeId: string;
  attributeValueId: string;
}

interface AttributeData {
  attributeId: string;
  attributeValueId: string;
}

interface VariationAttributeData {
  productVariationId: string;
  attributes: AttributeData[];
}

export class ProductVariationsManager {
  static encodeSku(
    categoryCode: string,
    year: number,
    correlativeProduct: number,
    correlativeProductVariant: number,
  ): string {
    return (
      categoryCode +
      year.toString().padStart(4, '0') +
      correlativeProduct.toString().padStart(4, '0') +
      correlativeProductVariant.toString().padStart(3, '0')
    );
  }

  static decodeSku(sku: string): SkuComponents {
    const categoryCode = sku.slice(0, 2);
    const year = parseInt(sku.slice(2, 6));
    const correlativeProduct = parseInt(sku.slice(6, 10));
    const correlativeProductVariant = parseInt(sku.slice(10, 13));
    return {
      categoryCode,
      year,
      correlativeProduct,
      correlativeProductVariant,
    };
  }

  static checkUniqueAttributeIds(listAttributes: AttributeData[]): boolean {
    return !listAttributes.some(
      (item, index) =>
        listAttributes.findIndex(
          (attribute) => attribute.attributeId === item.attributeId,
        ) !== index,
    );
  }

  static groupAttributeResult(
    variationAttributesResult: VariationAttributeResult[],
  ): VariationAttributeData[] {
    return variationAttributesResult.reduce((acc, item) => {
      const existingVariation = acc.find(
        (variation) => variation.productVariationId === item.productVariationId,
      );

      if (existingVariation) {
        existingVariation.attributes.push({
          attributeId: item.attributeId,
          attributeValueId: item.attributeValueId,
        });
      } else {
        acc.push({
          productVariationId: item.productVariationId,
          attributes: [
            {
              attributeId: item.attributeId,
              attributeValueId: item.attributeValueId,
            },
          ],
        });
      }

      return acc;
    }, []);
  }

  static existsAttributes(
    listNewAttributes: AttributeData[],
    listExistingAttributes: VariationAttributeData[],
  ): boolean {
    const sortedListNewAttributes = listNewAttributes.sort((a, b) =>
      a.attributeId.localeCompare(b.attributeId),
    );

    const sortedListExistingAttributes = listExistingAttributes.map(
      (existingAttribute) => ({
        productVariationId: existingAttribute.productVariationId,
        attributes: existingAttribute.attributes.sort((a, b) =>
          a.attributeId.localeCompare(b.attributeId),
        ),
      }),
    );

    return sortedListExistingAttributes.some((existingAttribute) => {
      return (
        existingAttribute.attributes.length ===
          sortedListNewAttributes.length &&
        existingAttribute.attributes.every((attribute, index) => {
          return (
            attribute.attributeId ===
              sortedListNewAttributes[index].attributeId &&
            attribute.attributeValueId ===
              sortedListNewAttributes[index].attributeValueId
          );
        })
      );
    });
  }
}
