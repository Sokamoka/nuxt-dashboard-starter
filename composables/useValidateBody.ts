import type { H3Event } from "h3";
import { createError, readBody } from "h3";
import * as v from "valibot";

const DEFAULT_ERROR_MESSAGE = "Bad Request";
const DEFAULT_ERROR_STATUS = 400;

type VSchema<TInput, TOutput, TIssue extends v.BaseIssue<unknown>> =
  | v.BaseSchema<TInput, TOutput, TIssue>
  | v.BaseSchemaAsync<TInput, TOutput, TIssue>;

export async function useValidatedBody<
  TInput,
  TOutput,
  TIssue extends v.BaseIssue<unknown>
>(
  event: H3Event,
  schema: VSchema<TInput, TOutput, TIssue>,
  config?: v.Config<v.InferIssue<VSchema<TInput, TOutput, TIssue>>>
): Promise<TOutput> {
  try {
    const body = await readBody(event);

    const parsed = await v.parseAsync(schema, body, config);
    return parsed;
  } catch (error) {
    throw createBadRequest(error);
  }
}

function createBadRequest(error: unknown) {
  return createError({
    statusCode: DEFAULT_ERROR_STATUS,
    statusText: DEFAULT_ERROR_MESSAGE,
    data: error,
  });
}
