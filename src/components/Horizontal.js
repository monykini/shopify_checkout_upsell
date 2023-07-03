import React, { useState, useCallback } from "react";
import { InlineLayout, View, Pressable, Icon, Style } from "@shopify/checkout-ui-extensions-react";
import { HorizontalItemSkeleton } from "./HorizontalItemSkeleton";
import { HorizontalItem } from "./HorizontalItem";

const DEFAULT_IMAGE_URL = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_medium.png?format=webp&v=1530129081";

const ButtonView = ({ direction, onPress }) => (
  <View border="none" padding="none" blockAlignment="center">
    <Pressable 
      border="base"
      padding="extraTight"
      cornerRadius="fullyRounded"
      onPress={onPress}
      inlineAlignment="center"
      blockAlignment="center"
    > 
      <Icon 
        appearance="subdued" 
        source={direction === 'prev' ? "arrowLeft" : "arrowRight"} 
        size="extraSmall" 
      />
    </Pressable>
  </View>
);

const Skeletons = () => <HorizontalItemSkeleton key={1} />;

export function Horizontal({ loading, products, adding }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeProd = useCallback((direction) => {
    setCurrentIndex(prevIndex => {
      const nextIndex = prevIndex + (direction === 'next' ? 1 : -1);
      const lastIndex = products.length - 1;
      return nextIndex > lastIndex ? 0 : nextIndex < 0 ? lastIndex : nextIndex;
    });
  }, [products]);

  if (loading) {
    return <Skeletons />;
  }

  const product = products[currentIndex];
  if (!product) {
    return null;
  }

  const variant = product.variants.nodes[0];
  const viewPaddingStyle = Style.default('tight')
    .when({viewportInlineSize: {min: 'small', max: 'medium'}}, 'extraTight');

  return (
    <InlineLayout columns={[24, 'fill' , 24]}>
      <ButtonView direction='prev' onPress={() => changeProd('prev')} />
      <View padding={["none","base","none","base"]}>
        <View padding={viewPaddingStyle} blockAlignment="center" border="base" borderRadius="base">
          <HorizontalItem
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
      </View>
      <ButtonView direction='next' onPress={() => changeProd('next')} />
    </InlineLayout>
  );
}
