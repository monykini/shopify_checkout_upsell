import React, { useEffect, useCallback } from "react";
import { HorizontalItemSkeleton } from "./HorizontalItemSkeleton";
import { HorizontalItem } from "./HorizontalItem";
import {
  InlineLayout,
  View,
  Button,
  Icon
} from "@shopify/checkout-ui-extensions-react";

function ButtonView({direction, onPress}) {
  return (
    <View border="base" padding="base" blockAlignment="center" border="none">
      <Button
        kind="plain"
        onPress={onPress}
        disabled={false}
      > 
        <Icon source={direction === 'prev' ? "arrowLeft" : "arrowRight"} size="small"  />
      </Button>
    </View>
  );
}

function Skeletons() {
  return (
    <>
      <HorizontalItemSkeleton key={1} />
      <HorizontalItemSkeleton key={2} />
      <HorizontalItemSkeleton key={3} />
    </>
  );
}

export function Horizontal({ loading, products, adding }) {

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const product = products[currentIndex];

  const changeProd = useCallback((direction) => {
    setCurrentIndex(prevIndex => {
      const nextIndex = prevIndex + (direction === 'next' ? 1 : -1);
      const lastIndex = products.length - 1;
      return nextIndex > lastIndex ? 0 : nextIndex < 0 ? lastIndex : nextIndex;
    });
  }, [products]);
  // Just so the Buttons never rerender
  const changeProdPrev = useCallback(() => {
    changeProd('prev');
  }, [changeProd]);

  const changeProdNext = useCallback(() => {
    changeProd('next');
  }, [changeProd]);

  return (
    <React.Fragment>
      {loading ? <Skeletons /> : (
        product && (
          <InlineLayout columns={['10%', 'fill' , '10%']}>
            <ButtonView direction='prev' onPress={changeProdPrev} />
            <View border="base" padding="base" blockAlignment="center" border="none">
              <HorizontalItem
                  key={product.variants.nodes[0].id}
                  variantId={product.variants.nodes[0].id}
                  title={product.title}
                  price={product.variants.nodes[0].price.amount}
                  discountedPrice={product.variants.nodes[0].price.amount}
                  img={product.images.nodes[0]?.url ?? "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_medium.png?format=webp&v=1530129081"}
                  onPress={product.onPress}
                  adding={adding}
              />
            </View>
            <ButtonView direction='next' onPress={changeProdNext} />
          </InlineLayout>
        )
      )}
    </React.Fragment>
  );
}