import React from "react";
import {
  BlockStack,
  InlineLayout,
  SkeletonText,
  SkeletonImage,
  Button,
} from "@shopify/checkout-ui-extensions-react";

export function HorizontalItemSkeleton() {
  return (
    <InlineLayout
      spacing="base"
      columns={[64, "fill", "auto"]}
      blockAlignment="center"
    >
      <SkeletonImage aspectRatio={1} />
      <BlockStack spacing="none">
        <SkeletonText inlineSize="large" />
        <SkeletonText inlineSize="small" />
        <SkeletonText inlineSize="small" />
      </BlockStack>
      <Button kind="secondary" disabled={true}>
        Add
      </Button>
    </InlineLayout>
  );
}
