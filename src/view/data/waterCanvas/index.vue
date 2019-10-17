<template>
  <div class="water-container">
    <canvas :id="data.canvasId" :class="'waterCanvas'"></canvas>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: new Object(),
      canvasId: {
        type: String,
        default: ""
      },
      sp: {
        type: Number,
        default: 0
      },
      value: {
        type: Number,
        default: 0
      }
    }
  },
  mounted() {
    this.init(this.data);
  },
  methods: {
    init(control) {
      control.ctx = document.getElementById(control.canvasId).getContext("2d");
      control.oW = document.getElementById(control.canvasId).width =
        300 + 15 + 10;
      control.oH = document.getElementById(control.canvasId).height = 240;
      /*control.ctx.strokeRect(10, 10);
      control.ctx.moveTo(10, 10);
      control.ctx.lineTo(10, 10);
      control.ctx.translate = (10, 20, 10, 20);*/
      let lineWidth = 2; //line width
      control.r = control.oW / 2;
      let paddingTop = 30;
      control.cR = control.r - paddingTop * lineWidth;
      //Initial parameters of water wave drawing
      control.axisLength = 2 * control.r * lineWidth;
      control.unit = control.axisLength / 10;
      control.range = 0.1;
      control.nowrange = control.range;
      control.xoffset = 8 * lineWidth;
      control.sp = control.sp;
      control.waveupsp = 0.04;
      let my_gradient = control.ctx.createLinearGradient(0, 0, 0, 300);
      my_gradient.addColorStop((100 - control.value) / 100, "#0EA5CB");
      my_gradient.addColorStop(1, "#FFF");
      control.ctx.fillStyle = my_gradient;
      control.ctx.globalAlpha = 0.1;
      control.nowdata = 0;
      control.value = control.value / 100;
      this.render(control);
    },
    render(control) {
      control.ctx.clearRect(0, 0, control.oW, control.oH);

      if (control.value >= 0.85) {
        if (control.nowrange > control.range / 4) {
          let t = control.range * 0.01;
          control.nowrange -= t;
        }
      } else if (control.value <= 0.1) {
        if (control.nowrange < control.range * 1.5) {
          let t = control.range * 0.01;
          control.nowrange += t;
        }
      } else {
        if (control.nowrange <= control.range) {
          let t = control.range * 0.01;
          control.nowrange += t;
        }
        if (control.nowrange >= control.range) {
          let t = control.range * 0.01;
          control.nowrange -= t;
        }
      }
      if (control.value - control.nowdata > 0) {
        control.nowdata += control.waveupsp;
      }
      if (control.value - control.nowdata < 0) {
        control.nowdata -= control.waveupsp;
      }
      control.sp += 0.14;
      this.drawSine(control);
      requestAnimationFrame(() => {
        this.render(control);
      });
    },
    drawSine(control) {
      control.ctx.beginPath();
      control.ctx.save();
      let Stack = [];
      for (
        let i = control.xoffset;
        i <= control.xoffset + control.axisLength;
        i += 20 / control.axisLength
      ) {
        let x = control.sp + (control.xoffset + i) / control.unit,
          y = Math.sin(x) * control.nowrange,
          dx = i,
          dy =
            2 * control.cR * (1 - control.nowdata) +
            (control.r - control.cR) -
            control.unit * y;
        control.ctx.lineTo(dx, dy);
        Stack.push([dx, dy]);
      }
      let startP = Stack[0],
        endP = Stack[Stack.length - 1];
      control.ctx.lineTo(control.xoffset + control.axisLength, control.oW);
      control.ctx.lineTo(control.xoffset, control.oW);
      control.ctx.lineTo(startP[0], startP[1]);
      control.ctx.fill();
      control.ctx.restore();
    },   
  }
};
</script>

<style scoped lang="scss">
.water-container {
  .waterCanvas {
    position: absolute;
    // pointer-events: none;
    left: -16px;
    bottom: 0px;
  }
}
</style>