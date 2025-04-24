export function formatError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }
  return new Error(
    typeof error === "string" ? error : "Une erreur inconnue est survenue",
  );
}
