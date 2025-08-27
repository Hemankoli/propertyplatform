import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style } from "ol/style";
import Overlay from "ol/Overlay";

export default function PropertyMap({ properties }) {
  const mapRef = useRef();
  const popupRef = useRef();
  const [popupContent, setPopupContent] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (mapInstance) {
      mapInstance.setTarget(null);
    }

    const features = properties
      .filter((p) => p.location?.coordinates?.length === 2)
      .map((p) => {
        const feature = new Feature({
          geometry: new Point(
            fromLonLat([p.location.coordinates[0], p.location.coordinates[1]])
          ),
          property: p,
        });
        feature.setStyle(
          new Style({
            image: new Icon({
              src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              scale: 0.05,
            }),
          })
        );
        return feature;
      });

    const vectorSource = new VectorSource({ features });
    const vectorLayer = new VectorLayer({ source: vectorSource });

    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: new View({
        center: fromLonLat([78.9629, 20.5937]), // Center of India
        zoom: 4,
      }),
    });

    const olOverlay = new Overlay({
      element: popupRef.current,
      autoPan: true,
      autoPanAnimation: { duration: 250 },
    });

    map.addOverlay(olOverlay);

    map.on("click", function (evt) {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (feat) => feat);
      if (feature) {
        const prop = feature.get("property");
        setPopupContent(prop);
        olOverlay.setPosition(evt.coordinate);
      } else {
        olOverlay.setPosition(undefined);
        setPopupContent(null);
      }
    });

    setMapInstance(map);
  }, []);

  return (
    <div className="relative h-[500px]">
      <div ref={mapRef} className="w-full h-full rounded-lg shadow-lg"></div>

      <div
        ref={popupRef}
        className="bg-white p-4 rounded shadow-lg absolute"
        style={{
          display: popupContent ? "block" : "none",
          bottom: "50px",
          left: "50px",
          minWidth: "200px",
        }}
      >
        {popupContent && (
          <>
            <h3 className="font-bold text-lg">{popupContent.title}</h3>
            <p className="text-gray-600">{popupContent.location.address}</p>
            <p className="text-orange-600 font-bold">₹ {popupContent.price}</p>
          </>
        )}
      </div>
    </div>
  );
}