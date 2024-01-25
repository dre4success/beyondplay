/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password)\n  }\n": types.LoginDocument,
    "\n  query Continents {\n    continents {\n      code\n      name\n    }\n  }\n": types.ContinentsDocument,
    "\n  query Countries($countriesFilter: CountryFilterInput) {\n    countries(filter: $countriesFilter) {\n      name\n      languages {\n        code\n        name\n      }\n      capital\n      emoji\n      phones\n    }\n  }\n": types.CountriesDocument,
    "\n  query AllFims {\n    allFilms {\n      films {\n        director\n        releaseDate\n        title\n      }\n    }\n  }\n": types.AllFimsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password)\n  }\n"): (typeof documents)["\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Continents {\n    continents {\n      code\n      name\n    }\n  }\n"): (typeof documents)["\n  query Continents {\n    continents {\n      code\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Countries($countriesFilter: CountryFilterInput) {\n    countries(filter: $countriesFilter) {\n      name\n      languages {\n        code\n        name\n      }\n      capital\n      emoji\n      phones\n    }\n  }\n"): (typeof documents)["\n  query Countries($countriesFilter: CountryFilterInput) {\n    countries(filter: $countriesFilter) {\n      name\n      languages {\n        code\n        name\n      }\n      capital\n      emoji\n      phones\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllFims {\n    allFilms {\n      films {\n        director\n        releaseDate\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllFims {\n    allFilms {\n      films {\n        director\n        releaseDate\n        title\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;