import "./HeroSwiperBox.css";

function HeroSwiperBox({ bgCover, name }) {
  return (
    <div
      className="hero-swiper-box"
      style={{ backgroundImage: `url(../../../../../../${bgCover})` }}
    >
      <div className="hero-swiper-box-name">{name}</div>
    </div>
  );
}
export default HeroSwiperBox;
