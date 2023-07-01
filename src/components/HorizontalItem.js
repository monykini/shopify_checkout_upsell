import React from "react";
import {
  InlineLayout,
  Image,
  BlockStack,
  Text,
  Button,
  useExtensionApi,
} from "@shopify/checkout-ui-extensions-react";

export function HorizontalItem({
  variantId,
  title,
  price,
  discountedPrice,
  img,
  onPress,
  adding,
}) {

  const { i18n } = useExtensionApi();

  return (
    <InlineLayout
      spacing="base"
      columns={[64, "fill", "auto"]}
      blockAlignment="center"
    >
      <Image
        border="base"
        borderWidth="base"
        borderRadius="loose"
        source={img || "https://via.placeholder.com/100/F1F1F1?text=%23"}
        description={title}
        aspectRatio={1}
        accessibilityDescription={title.split("|")[1]}
      />
      <BlockStack spacing="none">
        <Text size="base" emphasis="strong">
          {title}
        </Text>
        <InlineLayout spacing="tight" columns={["auto", "auto"]}>
          <Text appearance="accent" emphasis={"strong"}>
            {i18n.formatCurrency(price)}
          </Text>
        </InlineLayout>
        {price !== discountedPrice && (
          <InlineLayout spacing="extraTight" columns={["auto", "auto"]}>
            <Text appearance="subdued">You save</Text>
            <Text appearance="success" emphasis={"strong"}>
              {i18n.formatCurrency(price - discountedPrice)}
            </Text>
          </InlineLayout>
        )}
      </BlockStack>
      <Button
        kind="secondary"
        accessibilityLabel={`Add ${title} to cart`}
        onPress={() => onPress(variantId, discountedPrice)}
        loading={adding === variantId}
        disabled={adding && adding !== variantId}
      >
        Add
      </Button>
    </InlineLayout>
  );
}
