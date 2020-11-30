import React from "react";

// moment for time-zone calculation
import moment from "moment";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import CardNews from "components/CardNews.js";

// import "../../App.scss";


export default function News({state}) {

  const worldCovidNews = state.worldCovidNews;
  console.log(worldCovidNews)

  return (
    <div>
      <GridContainer>
        {!state.loading &&
          worldCovidNews.articles.map((item, index) => {
            let publishedTime = moment.utc(item.publishedAt).toDate();
            let localTime = moment(publishedTime)
              .local()
              .format("YYYY-MM-DD HH:mm");
            let timeFormat = moment(localTime).fromNow();
            return (
              <GridItem xs={12} sm={12} md={12}>
                <CardNews
                  newsTitle={item.title}
                  newsDescription={item.description}
                  newsURL={item.url}
                  newsPublishedAt={timeFormat}
                  source={item.source.name}
                  image={item.image}
                />
              </GridItem>
            );
          })}
      </GridContainer>
    </div>
  );
}
