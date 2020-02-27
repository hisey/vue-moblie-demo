<template>
  <div class="baidu-map-box">
    <baidu-map class="bm-view" :center="center" :scroll-wheel-zoom="true" :zoom="zoom" @ready="handler">
      <!-- <van-search class="seacher-input" placeholder="请输入地点关键词进行搜素哦" v-model="keyword" /> -->
      <div class="seacher-box">
        <img class="nav-back" v-show="!showLocalSearch" @click="handleBack()" src="../assets/img/icon/nav_back.png"
          alt />
        <div class="seacher-input">
          <img class="search-icon" src="../assets/img/icon/icon_search.png" alt />
          <input v-model="keyword" @focus="showLocalSearch=true" placeholder="请输入医院名称" type="text" />
          <i v-show="keyword!=''" @click="keyword=''" class="close phone-close"></i>
        </div>
        <span class="canle-btn" v-show="showLocalSearch" @click="handleCanle">取消</span>
      </div>
      <bm-local-search v-show="showLocalSearch" class="bm-local-search" :keyword="keyword" :auto-viewport="true"
        :pageCapacity="5" :location="location" @infohtmlset="infohtmlset"></bm-local-search>
      <bm-view class="map"></bm-view>
      <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
    </baidu-map>
    <div class="bottom-btn" v-show="showBottomBtn">
      <div class="cancel-btn" @click="handleCanle">取消</div>
      <div class="definite-btn" @click="handleEnter">确认</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          name: "",
          address: "", //详细地址
          addressComponents: {
            provinceName: "", //省份
            cityName: "", //城市
            districtName: "" //行政区
          },
          lng: 0, //精度
          lat: 0 //维度
        };
      }
    }
  },
  data() {
    return {
      showBottomBtn: false,
      showLocalSearch: false,
      location: "",
      keyword: "",
      zoom: 12,
      BMap: null,
      // map: null,
      center: {
        lng: 0,
        lat: 0
      },
      address: {},
      addressComponents: {}
    };
  },
  watch: {
    keyword(val) {
      if (val != "") {
        this.showLocalSearch = true;
      }
      this.showBottomBtn = false;
    }
  },
  methods: {
    handleBack() {
      this.$emit("cancel");
    },
    handleCanle() {
      this.showLocalSearch = false;
      this.keyword = "";
    },
    infohtmlset(e) {
      this.showLocalSearch = false;
      this.showBottomBtn = true;
      this.getLocation(e.point, e.address);
    },
    addressClone(d) {
      let data = JSON.parse(JSON.stringify(d));
      this.center.lng = data.lng;
      this.center.lat = data.lat;
      this.address = data.address;
      this.addressComponents.provinceName = data.addressComponents.provinceName;
      this.addressComponents.cityName = data.addressComponents.cityName;
      this.addressComponents.districtName = data.addressComponents.districtName;
    },
    handleEnter() {
      let obj = {
        address: this.address,
        addressComponents: this.addressComponents,
        lng: this.center.lng,
        lat: this.center.lat
      };
      if (this.center.lng == 0 || this.center.lng == "") {
        return false;
      }
      // console.log(obj);
      this.$emit("success", obj);
      this.visible = false;
    },
    handler({
      BMap,
      map
    }) {
      this.addressClone(this.data);
      this.map = map;
      this.BMap = BMap;
      let $this = this;
      if (this.data.lng == "" || this.data.lng == 0) {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(
          function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              $this.center.lng = r.point.lng;
              $this.center.lat = r.point.lat;
            } else {
              alert("failed" + this.getStatus());
            }
          }, {
            enableHighAccuracy: true
          }
        );
      }
    },
    getLocation(point, address) {
      let BMap = this.BMap;
      let geocoder = new BMap.Geocoder(); //创建地址解析器的实例
      geocoder.getLocation(point, rs => {
        // console.log(rs);
        let data = {
          lng: point.lng,
          lat: point.lat,
          address: address || rs.address,
          addressComponents: {
            provinceName: rs.addressComponents.province,
            cityName: rs.addressComponents.city,
            districtName: rs.addressComponents.district
          }
        };
        this.addressClone(data);
      });
    }
  }
};

</script>
<style lang="less" scoped>
  .baidu-map-box {
    min-height: 100vh;
  }

  .bm-view {
    width: 100%;
    min-height: 100vh;
    position: relative;
  }

  .map {
    width: 100%;
    min-height: 100vh;
  }

  .bm-local-search {
    position: absolute;
    width: 100%;
    z-index: 2;
    top: 55px;
    background-color: #fff;
    left: 0;
  }

  .seacher-box {
    padding: 10px 16px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    z-index: 2;
    background-color: #fff;

    .nav-back {
      width: 32px;
      height: 32px;
      position: relative;
      left: -8px;
    }

    .seacher-input {
      flex: 1;
      // height: 32px;
      // line-height: 20px;
      background: #f4f6f9;
      border-radius: 17px;
      padding-left: 36px;
      padding-right: 36px;
      padding-top: 8px;
      padding-bottom: 8px;
      box-sizing: border-box;
      position: relative;

      .search-icon {
        position: absolute;
        left: 15px;
        top: 11px;
        width: 14px;
      }

      input {
        border-radius: 17px;
        background: #f4f6f9;
        color: #282828;
        display: block;
        width: 100%;
      }
    }

    .canle-btn {
      color: #666666;
      font-size: 16px;
      margin-left: 14px;
    }
  }

  .close {
    display: block;
    width: 16px;
    height: 16px;
    background: url("../assets/img/icon/colse.png") center center no-repeat;
    background-size: 100%;
    position: absolute;
    right: 12px;
    top: 10px;
  }

  .bottom-btn {
    position: fixed;
    width: 100%;
    padding: 9px 32px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px -3px 5px 0px rgba(217, 223, 230, 0.2);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 14px;
    bottom: 0;

    .cancel-btn {
      margin-right: 23px;
      width: 144px;
      height: 38px;
      line-height: 38px;
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      border: 1px solid rgba(38, 136, 252, 1);
      color: #2688fc;
    }

    .definite-btn {
      color: #fff;
      width: 144px;
      border: 1px solid rgba(38, 136, 252, 1);
      height: 38px;
      line-height: 38px;
      background: rgba(38, 136, 252, 1);
      border-radius: 2px;
    }
  }

</style>
