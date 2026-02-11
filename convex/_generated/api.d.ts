/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as about_mutations from "../about/mutations.js";
import type * as about_queries from "../about/queries.js";
import type * as auth_mutations from "../auth/mutations.js";
import type * as auth_queries from "../auth/queries.js";
import type * as lib_requireAuth from "../lib/requireAuth.js";
import type * as projects_mutations from "../projects/mutations.js";
import type * as projects_queries from "../projects/queries.js";
import type * as seed from "../seed.js";
import type * as siteMeta_mutations from "../siteMeta/mutations.js";
import type * as siteMeta_queries from "../siteMeta/queries.js";
import type * as skills_mutations from "../skills/mutations.js";
import type * as skills_queries from "../skills/queries.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "about/mutations": typeof about_mutations;
  "about/queries": typeof about_queries;
  "auth/mutations": typeof auth_mutations;
  "auth/queries": typeof auth_queries;
  "lib/requireAuth": typeof lib_requireAuth;
  "projects/mutations": typeof projects_mutations;
  "projects/queries": typeof projects_queries;
  seed: typeof seed;
  "siteMeta/mutations": typeof siteMeta_mutations;
  "siteMeta/queries": typeof siteMeta_queries;
  "skills/mutations": typeof skills_mutations;
  "skills/queries": typeof skills_queries;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
