import type { H3Event } from "h3";
import { createError } from "h3";
import * as v from "valibot";

const DEFAULT_ERROR_MESSAGE = "Bad Request";
const DEFAULT_ERROR_STATUS = 400;

type VSchema<TInput, TOutput, TIssue extends v.BaseIssue<unknown>> =
  | v.BaseSchema<TInput, TOutput, TIssue>
  | v.BaseSchemaAsync<TInput, TOutput, TIssue>;

export default async function <
  TInput,
  TOutput,
  TIssue extends v.BaseIssue<unknown>
>(
  event: H3Event,
  schema: VSchema<TInput, TOutput, TIssue>,
  config?: v.Config<v.InferIssue<VSchema<TInput, TOutput, TIssue>>>
): Promise<TOutput> {
  try {
    const query = await getQuery(event);

    const parsed = await v.parseAsync(schema, query, config);
    return parsed;
  } catch (error) {
    const issues  = error instanceof v.ValiError ? error.issues : [];
      throw createError({
        statusCode: DEFAULT_ERROR_STATUS,
        statusText: DEFAULT_ERROR_MESSAGE,
        message: issues[0].message || '',
        data: issues,
      });
  }
}
