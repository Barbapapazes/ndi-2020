<template>
  <h2 class="text-2xl font-bold mb-2">
    {{ t('index.weather') }}
  </h2>
  <section v-if="!data" class="font-semibold italic">
    {{ t('index.weather_click') }}
  </section>
  <section v-else class="text-xl">
    <div class="mb-2">
      <Icon
        icon="carbon:partly-cloudy"
        class="inline-block text-blue-400 text-2xl mr-2"
      />
      <span class="font-semibold">Temps :</span> {{ data.weather[0].main }} ({{
        data.weather[0].description
      }})
    </div>
    <div class="mb-2">
      <Icon
        icon="carbon:enterprise"
        class="inline-block text-blue-400 text-2xl mr-2"
      />
      <span class="font-semibold">Ville :</span> {{ data.name }}
    </div>

    <div class="mb-2">
      <Icon
        icon="carbon:temperature"
        class="inline-block text-blue-400 text-2xl mr-2"
      />
      <span class="font-semibold">Température :</span>
      {{ Math.floor(data.main.temp - 273) }}°
    </div>
  </section>
  <!-- <pre>{{ data }}</pre> -->
  <h2 class="text-2xl font-bold">
    {{ t('index.map') }}
  </h2>
  <div style="height: 75vh" class="mt-2 mx-auto w-full md:w-3/4">
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :center="[47.41322, -1.219482]"
      @move="log('move')"
      @click="mapClick"
      @touch="mapClick"
    >
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <l-control-layers />

      <l-marker
        v-for="marker in markers"
        :key="marker"
        :lat-lng="[marker[0], marker[1]]"
      />

      <l-polyline
        :lat-lngs="[
          [47.334852, -1.509485],
          [47.342596, -1.328731],
          [47.241487, -1.190568],
          [47.234787, -1.358337],
        ]"
        color="green"
      />
      <l-polygon
        :lat-lngs="[
          [46.334852, -1.509485],
          [46.342596, -1.328731],
          [46.241487, -1.190568],
          [46.234787, -1.358337],
        ]"
        color="#41b782"
        :fill="true"
        :fill-opacity="0.5"
        fill-color="#41b782"
      />
      <l-rectangle
        :lat-lngs="[
          [46.334852, -1.509485],
          [46.342596, -1.328731],
          [46.241487, -1.190568],
          [46.234787, -1.358337],
        ]"
        :fill="true"
        color="#35495d"
      />
      <l-rectangle
        :bounds="[
          [46.334852, -1.190568],
          [46.241487, -1.090357],
        ]"
      >
        <l-popup> lol </l-popup>
      </l-rectangle>
    </l-map>
  </div>
</template>
<script>
import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
  LPopup,
  LPolyline,
  LPolygon,
  LRectangle,
} from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { useI18n } from 'vue-i18n'
export default {
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LControlLayers,
    LTooltip,
    LPopup,
    LPolyline,
    LPolygon,
    LRectangle,
  },
  setup() {
    const { t } = useI18n()
    return {
      t,
    }
  },
  data() {
    return {
      data: undefined,
      zoom: 4,
      markers: [
        [46.1621101, -1.2112804],
        [47.2770093, -2.2741513],
        [47.7493525, -3.397824],
        [48.4084597, -4.5346199],
        [43.7032472, 7.2177977],
        [43.1364183, 5.8984117],
      ],
      input: {
        lat: 0,
        lon: 0,
      },
    }
  },
  computed: {},
  // async mounted() {
  //   try {
  //     const res = await fetch(
  //       'http://localhost:4000/weather?lat=46.1621101&lon=-1.2112804',
  //     )
  //     const data = await res.json()
  //     this.data = data.data
  //   }
  //   catch (err) {
  //     console.error(err)
  //   }
  // },
  methods: {
    log(a) {
      console.log(a)
    },
    async mapClick(e) {
      if (e.latlng) {
        this.input.lat = e.latlng.lat
        this.input.lon = e.latlng.lng
        try {
          const res = await fetch(
            `http://146.59.202.171:4000/weather/${e.latlng.lng}/${e.latlng.lat}`
          )
          const data = await res.json()

          this.data = data.data
        } catch (err) {
          console.error(err)
        }
      }
    },
  },
}
</script>
