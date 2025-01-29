export function InTransaction() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (
        !this['unitOfWork'] ||
        !this.unitOfWork['entityManager'] ||
        this.unitOfWork.entityManager === undefined
      ) {
        throw new Error(
          `The method ${propertyKey} must be executed within a transaction`,
        );
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
