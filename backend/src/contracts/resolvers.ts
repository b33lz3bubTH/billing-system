// Define types
export type ResolverFunction<T> = (
  parent: any,
  args: any,
  context: any,
  info: any
) => T;

// Base class for resolvers
export class BaseResolver {
  static queries: Record<string, ResolverFunction<any>> = {};
  static mutations: Record<string, ResolverFunction<any>> = {};
  static fieldResolvers: Record<string, Record<string, ResolverFunction<any>>> =
    {};

  // Decorator for registering resolver functions for queries
  static QueryResolver(): MethodDecorator {
    return function (
      target: any,
      propertyKey: string | symbol,
      descriptor: PropertyDescriptor
    ): void {
      if (!target.constructor.queries) {
        target.constructor.queries = {};
      }
      target.constructor.queries[propertyKey.toString()] = descriptor.value;
    };
  }

  // Decorator for registering resolver functions for mutations
  static MutationResolver(): MethodDecorator {
    return function (
      target: any,
      propertyKey: string | symbol,
      descriptor: PropertyDescriptor
    ): void {
      if (!target.constructor.mutations) {
        target.constructor.mutations = {};
      }
      target.constructor.mutations[propertyKey.toString()] = descriptor.value;
    };
  }

  // Decorator for registering field resolver functions
  static FieldResolver(type: string, field: string): MethodDecorator {
    return function (
      target: any,
      propertyKey: string | symbol,
      descriptor: PropertyDescriptor
    ): void {
      if (!target.constructor.fieldResolvers) {
        target.constructor.fieldResolvers = {};
      }
      if (!target.constructor.fieldResolvers[type]) {
        target.constructor.fieldResolvers[type] = {};
      }
      target.constructor.fieldResolvers[type][field] = descriptor.value;
    };
  }

  // Method to render resolvers
  static render(): Record<string, Record<string, ResolverFunction<any>>> {
    const resolvers: { [key: string]: any } = {
      Query: {} as Record<string, ResolverFunction<any>>,
      Mutation: {} as Record<string, ResolverFunction<any>>,
    };

    Object.entries(this.queries).forEach(([methodName, resolver]) => {
      resolvers.Query[methodName] = resolver.bind(this);
    });

    Object.entries(this.mutations).forEach(([methodName, resolver]) => {
      resolvers.Mutation[methodName] = resolver.bind(this);
    });

    // Copy field resolvers from the class to the resolvers object
    Object.keys(this.fieldResolvers).forEach((type) => {
      resolvers[type] = { ...this.fieldResolvers[type] };
    });

    return resolvers;
  }
}
