<script>
  import { Line } from 'vue-chartjs'

  export default {
    name: 'LineChart',
    extends: Line,
    props: {
      options: {
        type: Object,
        required: true
      },
      data: {
        type: Object,
        required: true
      }
    },
    mounted() {
      this.renderChart(this.data, this.options);
    },
    data () {
      return {}
    }
  }
</script>