"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  AlertCircleIcon,
  RefreshCcwIcon,
} from "@turbocharger/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[calc(100vh-96px)] items-center justify-center">
      <Alert className="w-auto">
        <AlertCircleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong! Please try again later.</AlertDescription>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => reset()} icon={RefreshCcwIcon}>
            Try again
          </Button>
        </div>
      </Alert>
    </div>
  );
}
