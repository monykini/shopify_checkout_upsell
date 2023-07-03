import React from "react";
import {
  InlineLayout,
  Image,
  Text,
  Button,
  useExtensionApi,
  View,
  BlockSpacer
} from "@shopify/checkout-ui-extensions-react";

export function HorizontalItemMobile({
  variantId,
  title,
  price,
  discountedPrice,
  img,
  onPress,
  adding,
}) {

  const { i18n } = useExtensionApi();
  const imageSrc = img || "https://via.placeholder.com/100/F1F1F1?text=%23";

  return (
    <InlineLayout
      spacing="base"
      columns={[86, "fill"]}
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
        <Text size="medium" emphasis="strong" appearance="default">{title} <Text appearance="subdued" emphasis={"strong"} size={"medium"}> | {i18n.formatCurrency(price)}</Text></Text> 
        <BlockSpacer spacing={"base"} />
        <InlineLayout 
          spacing={"none"}  
          overflow={"hidden"}  
          maxBlockSize={38} 
          blockAlignment={"center"} 
          inlineAlignment={"start"}  
          columns={['fill']}
        >
          <Button
            kind="primary"
            accessibilityLabel={`Add ${title} to cart`}
            onPress={() => onPress(variantId, discountedPrice)}
            loading={adding === variantId}
            disabled={adding && adding !== variantId}
          >
            <Text size={"medium"}>&nbsp; &nbsp; &nbsp; &nbsp;Add to order&nbsp; &nbsp; &nbsp;&nbsp;</Text>
          </Button>
        </InlineLayout>
      </View>
    </InlineLayout>
  );
}
