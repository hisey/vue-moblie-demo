<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import request from '@/utils/http';
import svgIcon from '@/components/Icon/SvgIcon.vue';
import { onMounted } from 'vue';
interface Req {
  apiKey: string;
  area?: string;
  areaID?: string;
}
interface Res {
  area: string;
  areaCode: string;
  areaid: string;
  dayList: any[];
}
const get15DaysWeatherByArea = (data: Req) => {
  return request<Req, Res>({
    url: '/common/weather/get15DaysWeatherByArea',
    method: 'GET',
    data,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // },
    // interceptors: {
    //   requestInterceptors(res) {
    //     console.log('接口请求拦截');

    //     return res;
    //   },
    //   responseInterceptors(result) {
    //     console.log('接口响应拦截');
    //     return result;
    //   },
    // },
  });
};
onMounted(async () => {
  const res = await get15DaysWeatherByArea({
    apiKey: 't2EwWmG1e11a47daca54b794a0bbf88483e27456665ee61',
    area: '北京市',
  });
  console.log(res);
});
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <svgIcon name="test" :size="32"/>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style lang="less">
@import '@/style/base.css';
@import '@/style/var.less';

:root {
  --van-card-padding: @card-padding;
  --van-card-font-size: @card-font-size;
  --van-card-text-color: @card-text-color;
  --van-card-background-color: @card-background-color;
  --van-card-thumb-size: @card-thumb-size;
  --van-card-thumb-border-radius: @card-thumb-border-radius;
  --van-card-title-line-height: @card-title-line-height;
  --van-card-desc-color: @card-desc-color;
  --van-card-desc-line-height: @card-desc-line-height;
  --van-card-price-color: @card-price-color;
  --van-card-origin-price-color: @card-origin-price-color;
  --van-card-num-color: @card-num-color;
  --van-card-origin-price-font-size: @card-origin-price-font-size;
  --van-card-price-font-size: @card-price-font-size;
  --van-card-price-integer-font-size: @card-price-integer-font-size;
  --van-card-price-font-family: @card-price-font-family;
}

.van-card {
  position: relative;
  box-sizing: border-box;
  padding: var(--van-card-padding);
  color: var(--van-card-text-color);
  font-size: var(--van-card-font-size);
  background: var(--van-card-background-color);

  &:not(:first-child) {
    margin-top: var(--van-padding-xs);
  }

  &__header {
    display: flex;
  }

  &__thumb {
    position: relative;
    flex: none;
    width: var(--van-card-thumb-size);
    height: var(--van-card-thumb-size);
    margin-right: var(--van-padding-xs);

    img {
      border-radius: var(--van-card-thumb-border-radius);
    }
  }

  &__content {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    min-width: 0;
    /* hack for flex box ellipsis */
    min-height: var(--van-card-thumb-size);

    &--centered {
      justify-content: center;
    }
  }

  &__title,
  &__desc {
    word-wrap: break-word;
  }

  &__title {
    max-height: 32px;
    font-weight: var(--van-font-weight-bold);
    line-height: var(--van-card-title-line-height);
  }

  &__desc {
    max-height: var(--van-card-desc-line-height);
    color: var(--van-card-desc-color);
    line-height: var(--van-card-desc-line-height);
  }

  &__bottom {
    line-height: var(--van-line-height-md);
  }

  &__price {
    display: inline-block;
    color: var(--van-card-price-color);
    font-weight: var(--van-font-weight-bold);
    font-size: var(--van-card-price-font-size);
  }

  &__price-integer {
    font-size: var(--van-card-price-integer-font-size);
    font-family: var(--van-card-price-font-family);
  }

  &__price-decimal {
    font-family: var(--van-card-price-font-family);
  }

  &__origin-price {
    display: inline-block;
    margin-left: 5px;
    color: var(--van-card-origin-price-color);
    font-size: var(--van-card-origin-price-font-size);
    text-decoration: line-through;
  }

  &__num {
    float: right;
    color: var(--van-card-num-color);
  }

  &__tag {
    position: absolute;
    top: 2px;
    left: 0;
  }

  &__footer {
    flex: none;
    text-align: right;

    .van-button {
      margin-left: 5px;
    }
  }
}
</style>
