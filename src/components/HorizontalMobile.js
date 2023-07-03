import React, { useState } from "react";
import { InlineLayout, View, Pressable, Icon } from "@shopify/checkout-ui-extensions-react";
import { HorizontalItemSkeleton } from "./HorizontalItemSkeleton";
import { HorizontalItemMobile  } from "./HorizontalItemMobile";

const DEFAULT_IMAGE_URL = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_medium.png?format=webp&v=1530129081";

const Dot = ({ isActive }) => (
  <View
    cornerRadius="fullyRounded"
    margin="extraTight"
    maxBlockSize={6}
    maxInlineSize={6}
  > 
    <Icon 
      appearance={isActive ? "primary" : "subdued"} 
      maxBlockSize={6} 
      maxInlineSize={6} 
      source={ "hollowCircle"} 
      size="extraSmall" 
    />
  </View>
);

const Skeletons = () => <HorizontalItemSkeleton key={1} />;

export function HorizontalMobile({ loading, products, adding }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const product = products[currentIndex];

  if (loading) {
    return <Skeletons />;
  }

  if (!product) {
    return null;
  }

  const variant = product.variants.nodes[0];
  
  return (
    <View padding={["base","none","none","none"]}>
      <View padding={"tight"} blockAlignment="center" border="base" borderRadius="base">
        <HorizontalItemMobile
          key={variant.id}
          variantId={variant.id}
          title={product.title}
          price={variant.price.amount}
          discountedPrice={variant.price.amount}
          img={product.images.nodes[0]?.url || DEFAULT_IMAGE_URL}
          onPress={product.onPress}
          adding={adding}
        />
      </View>
      <InlineLayout blockAlignment="center" columns={[16,16,16]} inlineAlignment={"center"} spacing="none" display={"inline"} padding={["base","none","none","none"]}>
        {products.map((_, index) => (
          <Pressable key={index} onPress={() => setCurrentIndex(index)}>
            <Dot isActive={index === currentIndex} />
          </Pressable>
        ))}
      </InlineLayout>
    </View>
  );
}