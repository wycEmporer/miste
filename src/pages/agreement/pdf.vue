<template>
  <div id="pdf" ref="PDF" >
      <canvas id="the-canvas" style="width:100%;height:91.5%;"></canvas>  
      <div class="foot" v-if='pdfDoc'>  
        <button class='left' v-if="pageNum>=1" @click="onPrevPage">Pre</button>  
        <button class='right' v-if="pageNum<=pdfDoc.numPages" @click="onNextPage">Next</button>  
      </div>  
  </div>
</template>
<script>
import PDFJS from 'pdfjs-dist';
export default {
	data () {  
    return {  
      pdfDoc: null,  
      pageNum: 1,  
      pageRendering: false,  
      pageNumPending: null,  
      scale:0.7
    }
  },
  created () {
    if(JSON.parse(sessionStorage.isIN)){
      this.showPDF('../../../static/termsfile/International-Happyeasygo.pdf');
    }else{
      this.showPDF('../../../static/termsfile/Happyeasygo-Inland.pdf');
    }
  },
  methods: {  
    showPDF (url) {  
      let _this = this  
      PDFJS.getDocument(url).then(function (pdf) {  
        _this.pdfDoc = pdf  
        _this.renderPage(1)  
      })  
    },  
    renderPage (num) {  
      this.pageRendering = true  
      let _this = this  
      this.pdfDoc.getPage(num).then(function (page) {  
        var viewport = page.getViewport(_this.scale)  
        let canvas = document.getElementById('the-canvas')  
        canvas.height = viewport.height  
        canvas.width = viewport.width  
  
        // Render PDF page into canvas context  
        var renderContext = {  
          canvasContext: canvas.getContext('2d'),  
          viewport: viewport  
        }  
        var renderTask = page.render(renderContext)  
  
        // Wait for rendering to finish  
        renderTask.promise.then(function () {  
          _this.pageRendering = false  
          if (_this.pageNumPending !== null) {  
            // New page rendering is pending  
            _this.renderPage(_this.pageNumPending)  
            _this.pageNumPending = null  
          }  
        })  
      })  
    },  
    queueRenderPage (num) {  
      if (this.pageRendering) {  
        this.pageNumPending = num  
      } else {  
        this.renderPage(num)  
      }  
    },  
    onPrevPage () {  
      if (this.pageNum <= 1) {  
        return  
      }  
      this.pageNum--  
      this.queueRenderPage(this.pageNum)  
    },  
    onNextPage () {  
      if (this.pageNum >= this.pdfDoc.numPages) {  
        return  
      }
      this.pageNum++  
      this.queueRenderPage(this.pageNum)  
    }  
  }
}
</script>
<style lang="less" scoped>
#pdf{
	padding: 1.4rem 0 2rem;
	background-color: rgba(0,0,0,0.75);  
  position:fixed;  
  width: 100%;  
  height: 100%;  
  top: 0;  
  left: 0;  
  text-align: center;
	.the-canvas {
    display: block;
	}
	.foot {  
		position: fixed;  
		transform: translate(-50%,0);  
    left: 50%;
    bottom:0%;
    button{
      color:#fff;
      border:1px solid #fff;
      background:rgba(0,0,0,0.75);
      padding:0.1rem 0.5rem;
    }
	}  
}
</style>