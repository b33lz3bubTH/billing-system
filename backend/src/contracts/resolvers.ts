// resolver.ts
// import { ResolverFunction } from './types';

// TODO: later
export type ResolverFunction<T> = (
  parent: any,
  args: any,
  context: any,
  info: any
) => T;

// Decorator for registering resolver functions for queries
export function QueryResolver(): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    if (!target.queries) {
      target.queries = [];
    }
    target.queries.push(String(propertyKey));
    return descriptor;
  };
}

// Decorator for registering resolver functions for mutations
export function MutationResolver(): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    if (!target.mutations) {
      target.mutations = [];
    }
    target.mutations.push(String(propertyKey));
    return descriptor;
  };
}

// Function to automatically register resolver functions for queries and mutations
export function registerResolvers<T extends { prototype: any }>(
  target: new (...args: any[]) => T
): Record<string, ResolverFunction<any>> {
  const queries: string[] = target.prototype.queries || [];
  const mutations: string[] = target.prototype.mutations || [];

  const resolvers: Record<string, ResolverFunction<any>> = {};

  // Register resolver functions for queries
  queries.forEach((methodName: string) => {
    resolvers[methodName] = target.prototype[methodName].bind(target.prototype);
  });

  // Register resolver functions for mutations
  mutations.forEach((methodName: string) => {
    resolvers[methodName] = target.prototype[methodName].bind(target.prototype);
  });

  return resolvers;
}
