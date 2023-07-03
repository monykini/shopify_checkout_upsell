import React from "react";
import {
  InlineLayout,
  Image,
  Text,
  Button,
  useExtensionApi,
  View,
  BlockSpacer,
  InlineSpacer,
  Style
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

  const defaultColumns = [64, "fill"];
  const mediumColumns = [48, "fill"];
  const imageSrc = img || "https://via.placeholder.com/100/F1F1F1?text=%23";

  const layoutStyle = Style.default(defaultColumns)
    .when({viewportInlineSize: { min: 'medium'}}, mediumColumns)
    .when({viewportInlineSize: { min: 'large'}}, defaultColumns);
  
  const textSpacingStyle = Style.default("base")
    .when({viewportInlineSize: { min: 'medium'}}, "extraTight")
    .when({viewportInlineSize: { min: 'large'}}, "base");
    
  const inlineLayoutSpacingStyle = Style.default("tight")
    .when({viewportInlineSize: { min: 'medium'}}, "extraTight")
    .when({viewportInlineSize: { min: 'large'}}, "tight");

  const buttonTextStyle = Style.default("small")
    .when({viewportInlineSize: { min: 'medium' }}, 'extraSmall')
    .when({viewportInlineSize: { min: 'large'}}, "small");

  const layoutColumnsStyle = Style.default(defaultColumns)
    .when({viewportInlineSize: { min: 'medium'}}, ["30%", "0%" , "100%"])
    .when({viewportInlineSize: { min: 'large'}}, ["30%", "10%" , "fill"])


  return (
    <InlineLayout
      spacing="base"
      columns={layoutStyle}
      blockAlignment="center"
      padding="none"
    >
      <View border="none" padding="none">
        <Image
          border="none"
          borderWidth="base"
          borderRadius="loose"
          source={imageSrc}
          description={title}
          aspectRatio={1}
          accessibilityDescription={title.split("|")[1]}
        />
      </View>
      <View>
        <Text size="medium" emphasis="strong" appearance="subdued">{title}</Text> 
        <BlockSpacer spacing={textSpacingStyle} />
        <InlineLayout 
          spacing={inlineLayoutSpacingStyle}  
          overflow={"hidden"}  
          maxBlockSize={38} 
          blockAlignment={"center"} 
          inlineAlignment={"center"}  
          columns={layoutColumnsStyle}
        >
          <Text appearance="default" emphasis={"strong"} size={buttonTextStyle}>{i18n.formatCurrency(price, {form:'short'})}</Text>
          <InlineSpacer spacing="tight" />
          <Button
            kind="primary"
            accessibilityLabel={`Add ${title} to cart`}
            onPress={() => onPress(variantId, discountedPrice)}
            loading={adding === variantId}
            disabled={adding && adding !== variantId}
          >
            <Text size={buttonTextStyle}>Add to order</Text>
          </Button>
        </InlineLayout>
      </View>
    </InlineLayout>
  );
}
