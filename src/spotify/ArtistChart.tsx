import React, { useRef, useEffect, useState } from "react";
import Chart, { ChartDataSets } from "chart.js";
import { ArtistProps, Artist } from "./ArtistsData";

// get the number of artists from the users top artists who are popular.
  // If you have a popularity score over 50, you are popular
  const popularArtistsData = (props: ArtistProps): Array<number> => {
    if (props && props.artists) {
      const popArtists = props.artists.items.filter((artist: Artist) => {
        return artist.popularity > 50;
      });
      // to get nonPopularArtists you minus the popular artists from total top artists
      const nonPopularArtists = props.artists.items.length - popArtists.length;
      return [popArtists.length, nonPopularArtists];
    } else {
      return [50, 50];
    }
  };

  const chartData = (popularArtistsData: Array<number>): ChartDataSets => {
    return {
      data: popularArtistsData,
      //fill: "none",
      backgroundColor: ["#1db9a4", "#1db954"],
      borderWidth: 0,
    };
  };

  const renderChart = (
    ctx: React.RefObject<HTMLCanvasElement>,
    props: ArtistProps
  ): Chart | undefined => {
    if (ctx && ctx.current) {
      return new Chart(ctx.current, {
        type: "doughnut",
        data: {
          datasets: [chartData(popularArtistsData(props))],
          labels: ["Popular artist", "Specialist artist"],
        },
        options: {
          legend: {
            labels: {
              // This more specific font property overrides the global property
              fontColor: "white",
            },
            position: "bottom",
          },
        },
      });
    }
  };


export function ArtistChart(props: ArtistProps) {
  const ctx = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<Chart>();

  useEffect(() => {
    if (ctx) {
      const renderedChartRef = renderChart(ctx, props);
      if (renderedChartRef) {
        setChart(renderedChartRef);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    if (chart && chart.data && chart.data.datasets) {
      chart.data.datasets[0] = chartData(popularArtistsData(props));
      chart.update();
    }
  }, [props, chart]);

  const [popular, specialist]  = popularArtistsData(props) 
  const specialistPercentage = Math.floor((specialist / (popular + specialist)) * 100)

  return (
    <div>
        <h2>Over {specialistPercentage}% of your top 50 artists make specialist music.</h2>
        <canvas ref={ctx} />
        
        <p>Most of these musicians do not recieve enough money from Spotify</p>
        <p>Please help them by buying music direct or donating</p>  
    </div>
  );
}
