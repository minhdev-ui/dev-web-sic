import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import navLinks from "../../components/layout/partials/HeaderNav";
import Logo from "../../components/layout/partials/Logo";
import Cta from "../../components/sections/Cta";
import Footer from "../../components/layout/Footer";
import "./asset/style.scss";
import Slide from "../../components/elements/Slider";
import Slider from "react-slick";
import { MdOutlineDoubleArrow } from "react-icons/md";
import SignUpForm from "../../components/elements/SignUpForm";
import Circle from "../../components/elements/texture/Circle";
import Rectangle from "../../components/elements/texture/Rectangle";
import Polyline from "../../components/elements/texture/Polyline";

const propTypes = {
  children: Object,
  theme: String,
};

const defaultProps = {
  children: {},
  theme: "dark",
};
const TextureGroup = function () {
  return (
    <>
      <Circle rad={80} top={100} left={-34}></Circle>
      <Circle rad={30} top={300} right={150} fill="#f26031"></Circle>
      <Circle rad={60} top={80} right={50} fill="none"></Circle>
      <Rectangle fill="none" top={80} left={20} h={30}></Rectangle>
      <Polyline edge={60} top={108} left={-1}></Polyline>
    </>
  );
};
const Ban = ({ children, theme, className }) => {
  const opts = {
    dots: false,
    infinite: true,
    slideToShow: 1,
    slideToScroll: 1,
    nextArrow: (
      <div className="Ban-slides-next">
        <MdOutlineDoubleArrow />
      </div>
    ),
    prevArrow: (
      <div className="Ban-slides-previous">
        <MdOutlineDoubleArrow />
      </div>
    ),
  };
  const slider = useRef(null);
  const classes = classNames(`Ban_section Ban_section-${theme}`);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const handleSignUp = () => {
    setShowSignUpForm(!showSignUpForm);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={className}>
      {showSignUpForm && <SignUpForm stateFunc={handleSignUp}></SignUpForm>}
      <section className={classes}>
        <header className="Header-ban-pages">
          <div className="Ban-nav">
            <div className="navLinks">
              {navLinks.map((item, i) => {
                return (
                  <div className="navLink-item" key={item.name}>
                    {item.name}
                  </div>
                );
              })}
            </div>
            <div>
              <Logo />
            </div>
          </div>
        </header>
        <section className="Ban-main-content">
          <div className="f_layout">
            <div className="f_layout-f">
              <div className="f_layout-ff">
                <TextureGroup></TextureGroup>
                <h1 className="italic">
                  <span>{children.title}</span> {children.name}
                  <p className="uppercase">{children.clb}</p>
                </h1>
              </div>
              <div className="f_layout-fs">
                <div className="text_desc-ban">
                  <span>{children.registerMes}</span>
                </div>
                <div className="Ban-register-btn">
                  <button className="btn_desc-ban" onClick={handleSignUp}>
                    {children.btn}
                  </button>
                  <div className="shine"></div>
                </div>
              </div>
            </div>
            <div className="Ban-slides">
              <div className="Ban-slides-container">
                <Slider {...opts} ref={slider}>
                  {children.imagesIntro.map((item, i) => {
                    return (
                      <div className="Ban-slide-item" key={item}>
                        <img src={item} alt="" />
                      </div>
                    );
                  })}
                </Slider>
                <div className="Ban-slides-controls">
                  <div
                    className="Ban-slides-previous"
                    onClick={() => slider.current.slickPrev()}
                  >
                    <MdOutlineDoubleArrow />
                  </div>
                  <div
                    className="Ban-slides-next"
                    onClick={() => slider.current.slickNext()}
                  >
                    <MdOutlineDoubleArrow />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Slogan_page uppercase">
            <h1 className="h1-header-banpages">
              sinh viên giúp sinh viên làm chủ công nghệ
            </h1>
          </div>
          <div></div>
        </section>
        <Cta />
        <Footer />
      </section>
    </div>
  );
};

Ban.prototype = propTypes;
Ban.defaultProps = defaultProps;

export default Ban;
