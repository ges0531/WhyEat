import React, { Component } from "react";
export default class ES extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: Number,
      gap: 0,
      wishIdx: 0,
      wishList: [
        {
          name: "AirPods Pro",
          image:
            "https:store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MWP22?wid=2000&hei=2000&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1572990352299",
          price: 329000,
        },
        {
          name: "iPad Pro",
          image:
            "https:store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-pro-12-11-select-202003_GEO_KR?wid=445&amp;hei=550&amp;fmt=jpeg&amp;qlt=95&amp;op_usm=0.5,0.5&amp;.v=1583430766245",
          price: 1029000,
        },
        {
          name: "MacBook Air",
          image:
            "https:store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=452&hei=420&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1541713862468",
          price: 1320000,
        },
      ],
    };
  }
  componentWillMount() {
    this.setState({
      saved: 0,
    });
    setInterval(() => {
      this.setState({
        // @ts-ignore
        wishIdx: (this.state.wishIdx + 1) % this.state.wishList.length,
      });
    }, 3500);
    this.setState({
      // @ts-ignore
      wishIdx: (this.state.wishIdx + 1) % this.state.wishList.length,
    });
  }
  render() {
    return (
      <div id="app">
        <div className="container">
          <div className="flexContainer">
            <p>
            // @ts-ignore
              <span className="blue">{this.wishList[this.wishIdx].name}</span>{" "}
              // @ts-ignore
              {this.props.gap > 0 ? (
                <template>
                  // @ts-ignore
                  까지 <span className="blue">{this.props.animatedGap}</span> 원
                  남았어요.
                </template>
              ) : (
                <template>
                  // @ts-ignore
                  를 사고 <span className="blue">{this.animatedGap * -1}</span>{" "}
                  원이 남아요!
                </template>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }
}