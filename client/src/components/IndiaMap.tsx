import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import type { IndiaMapProps } from "@/types/props";

export const IndiaMap: React.FC<IndiaMapProps> = ({
    region,
    setRegion,
}) => {
    const [tooltipContent, setTooltipContent] = useState<string>("");

    const handleOnClick = (stateName: any) => {
        if (region === stateName) stateName = "";
        setRegion(stateName);
    };

    return (
        <div className="max-lg:hidden w-full">
            <h2 className="text-[16px] leading-normal font-bold mb-2">Select Region through Map</h2>
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 1000,
                    center: [82.8, 23],
                    rotate: [-2, 0, 0],
                }}
                className="w-full h-auto"
            >
                <Geographies geography="../india-states.json">
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const stateName = geo.properties.st_nm;
                            const isSelected = stateName === region;

                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onClick={() => handleOnClick(stateName)}
                                    onMouseEnter={() => setTooltipContent(stateName)}
                                    onMouseLeave={() => setTooltipContent("")}
                                    data-tooltip-id="state-tooltip"
                                    style={{
                                        default: {
                                            fill: isSelected ? "#F97535" : "#FFE37A",
                                            outline: "none",
                                            stroke: "#000",
                                            strokeWidth: 0.5,
                                            transition: "fill 0.3s ease",
                                        },
                                        hover: {
                                            fill: isSelected ? "#FE621D" : "#FF9966",
                                            outline: "none",
                                        },
                                        pressed: {
                                            fill: "#F97535",
                                            outline: "none",
                                        },
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>

            <Tooltip 
                id="state-tooltip" 
                place="top" 
                content={tooltipContent} 
                className="!bg-primary-400"
            />
        </div>
    );
};
