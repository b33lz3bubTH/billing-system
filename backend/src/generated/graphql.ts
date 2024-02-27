export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type BaseFields = {
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  updatedBy: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProducts: Products;
};


export type MutationCreateProductsArgs = {
  data: ProductCreateInput;
};

export type ProductCreateInput = {
  available: Scalars['Boolean']['input'];
  medias?: InputMaybe<Array<Scalars['JSON']['input']>>;
  mrp: Scalars['String']['input'];
  name: Scalars['String']['input'];
  postDescription: Scalars['String']['input'];
  sellingPrice: Scalars['String']['input'];
  shopOwner: Scalars['ID']['input'];
  tags: Array<Scalars['String']['input']>;
};

export type ProductFilterInput = {
  available?: InputMaybe<Scalars['Boolean']['input']>;
  mrp?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postDescription?: InputMaybe<Scalars['String']['input']>;
  sellingPrice?: InputMaybe<Scalars['String']['input']>;
  shopOwner?: InputMaybe<Scalars['ID']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Products = BaseFields & {
  __typename?: 'Products';
  available: Scalars['Boolean']['output'];
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  medias?: Maybe<Array<Scalars['JSON']['output']>>;
  mrp: Scalars['String']['output'];
  name: Scalars['String']['output'];
  postDescription: Scalars['String']['output'];
  sellingPrice: Scalars['String']['output'];
  shopOwner: Scalars['ID']['output'];
  tags: Array<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  updatedBy: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  fetchProducts: Array<Maybe<Products>>;
};


export type QueryFetchProductsArgs = {
  filter?: InputMaybe<ProductFilterInput>;
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};
