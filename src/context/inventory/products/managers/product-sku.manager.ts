export class ProductSkuManager {
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

  static decodeSku(sku: string): {
    categoryCode: string;
    year: number;
    correlativeProduct: number;
    correlativeProductVariant: number;
  } {
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
}
