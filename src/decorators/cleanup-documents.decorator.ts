const cleanupMongoDocument = (document: any) => {
  const id = document.id;
  const { _id, __v, ...cleanDocument } = document._doc;

  return { id, ...cleanDocument };
};

/**
 * This decorator is applicable to MongoDB documents
 * as the result of find operation
 *
 * Excludes _id and _v properties, but keeps
 * id as string instead
 */
export const CleanupDocuments = (): MethodDecorator => {
  return (_, __, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const data = await originalMethod.apply(this, args);

      return Array.isArray(data)
        ? data.map(cleanupMongoDocument)
        : cleanupMongoDocument(data);
    };

    return descriptor;
  };
};
