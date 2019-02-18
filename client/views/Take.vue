<template>
  <div id="Take">
    <div v-if="loading" class="take-notfound">
      <h1>正在寻找...</h1>
    </div>

    <template v-else>
      <div v-if="!isfound" class="take-notfound">
        <h1>Error: 寻找丢失...</h1>
      </div>
      <div v-else class="take-content">
        <h1>累计 {{ count }} 次交易</h1>

        <div class="container-url" v-if="haveUrl">
          解析到的链接：
          <a
            class="content-url"
            v-for="(item, index) in contentUrls"
            :href="item"
            :key="index"
          >{{ item }}</a>
        </div>
        <p>
          交易内容:
          <span class="take-content-core">{{ content }}</span>
        </p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import api from "../api";
interface httpRes {
  code: number;
  message: string;
  count: number;
  content: string;
}

interface mydata {
  loading: boolean;
  isfound: boolean;

  hash: string;
  code: number;
  count: number;
  message: string;
  content: string;
  contentUrls: any;
  haveUrl: boolean;
}

export default Vue.extend({
  data(): mydata {
    return {
      loading: true,
      isfound: false,
      hash: "",
      code: 1,
      count: 0,
      message: "",
      content: "",
      contentUrls: [],
      haveUrl: false
    };
  },
  created() {
    this.hash = this.$route.params.hash;
    api.take(this.hash).then(res => {
      this.refresh(res.data);
      this.analyze();
      this.loading = false;
    });
  },
  methods: {
    // 更新数据
    refresh(data: httpRes) {
      if (data.code == 0) {
        this.isfound = true;
      } else {
        this.isfound = false;
      }
      this.count = data.count;
      this.content = data.content;
    },
    // 匹配链接
    analyze() {
      var text = this.content;
      var patt = new RegExp("(https://pan.baidu.com/s/)+.{23}", "g");
      var url = text.match(patt);
      if (url != null) {
        this.haveUrl = true;
        this.contentUrls = url;
      }
    }
  }
});
</script>
