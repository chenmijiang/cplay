/** @format */

import React from 'react'
import styled from 'styled-components'

const Mobile = () => {
  return (
    <MobileWrapper>
      <section className="wrapper">
        <div className="container">
          <div id="scene" className="scene" data-hover-only="false">
            <div className="circle" data-depth="1.2"></div>

            <div className="one" data-depth="0.9">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="two" data-depth="0.60">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="three" data-depth="0.40">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <p className="p404" data-depth="0.50">
              404
            </p>
            <p className="p404" data-depth="0.10">
              404
            </p>
          </div>
          <div className="text">
            <article>
              <p>不支持移动页浏览 - o(￣┰￣*)ゞ</p>
            </article>
          </div>
        </div>
      </section>
    </MobileWrapper>
  )
}

const MobileWrapper = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  height: auto;
  font-family: 'Barlow', sans-serif;
  background: var(--bg-cyan-100);
  .wrapper {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow-x: hidden;
    .container {
      margin: 0 auto;
      transition: all 0.4s ease;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      // Scene for the Parallax Effect
      .scene {
        position: absolute;
        width: 100vw;
        height: 100vh;
        vertical-align: middle;
      }
      // All elements' containers
      .one,
      .two,
      .three,
      .circle,
      .p404 {
        width: 60%;
        height: 60%;
        top: 20% !important;
        left: 20% !important;
        font-family: var(--font-barlow);
        position: absolute;
        .content {
          width: 40rem;
          height: 40rem;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: content 0.8s cubic-bezier(1, 0.06, 0.25, 1) backwards;
          @keyframes content {
            0% {
              width: 0;
            }
          }
          // Pieces
          .piece {
            height: 2.1rem;
            width: 10rem;
            display: flex;
            position: absolute;
            border-radius: 80px;
            z-index: 1;
            animation: pieceLeft 8s cubic-bezier(1, 0.06, 0.25, 1) infinite both;
            @keyframes pieceLeft {
              0% {
              }
              50% {
                left: 80%;
                width: 10%;
              }
              100% {
              }
            }
            @keyframes pieceRight {
              0% {
              }
              50% {
                right: 80%;
                width: 10%;
              }
              100% {
              }
            }
          }
        }
      }
      // Text and Button container
      .text {
        width: 60%;
        height: 40%;
        min-width: 375px;
        min-height: 500px;
        position: absolute;
        animation: text 0.6s 1.8s ease backwards;
        @keyframes text {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
        }
        article {
          width: 100%;
          position: absolute;
          bottom: 0;
          z-index: 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          p {
            color: var(--font-white-100);
            font-family: 'Barlow', sans-serif;
            font-size: 1.1rem;
            letter-spacing: 0.6px;
            margin-bottom: 5rem;
            text-shadow: 6px 6px 10px var(--bg-cyan-200);
          }
        }
      }
      // The 404 Number
      .p404 {
        font-size: 10rem;
        font-weight: 700;
        letter-spacing: 4px;
        color: var(--font-white-100);
        display: flex !important;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 2;
        animation: anime404 0.6s cubic-bezier(0.3, 0.8, 1, 1.05) both;
        animation-delay: 1.2s;
        @keyframes anime404 {
          0% {
            opacity: 0;
            transform: scale(10) skew(20deg, 20deg);
          }
        }
        &:nth-of-type(2) {
          color: var(--bg-cyan-300);
          z-index: 1;
          animation-delay: 1s;
          filter: blur(10px);
          opacity: 0.8;
        }
      }
      // Bigger Circle
      .circle {
        position: absolute;
        &:before {
          content: '';
          position: absolute;
          width: 19rem;
          height: 19rem;
          background-color: var(--bg-cyan-320);
          border-radius: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: var(--circle-shadow);
          animation: circle 0.8s cubic-bezier(1, 0.06, 0.25, 1) backwards;

          @keyframes circle {
            0% {
              width: 0;
              height: 0;
            }
          }
        }
      }
      // Container 1
      .one {
        .content {
          // saller Circle
          &:before {
            content: '';
            position: absolute;
            width: 30rem;
            height: 30rem;
            background-color: var(--bg-cyan-330);
            border-radius: 100%;
            box-shadow: var(--circle-shadow);
            animation: circle 0.8s 0.4s cubic-bezier(1, 0.06, 0.25, 1) backwards;
          }
          .piece {
            background: var(--g-300);
            &:nth-child(1) {
              right: 15%;
              top: 18%;
              height: 30px;
              width: 120px;
              animation-delay: 0.5s;
              animation-name: pieceRight;
            }
            &:nth-child(2) {
              left: 15%;
              top: 45%;
              width: 150px;
              height: 50px;
              animation-delay: 1s;
              animation-name: pieceLeft;
            }
            &:nth-child(3) {
              left: 10%;
              top: 75%;
              height: 20px;
              width: 70px;
              animation-delay: 1.5s;
              animation-name: pieceLeft;
            }
          }
        }
      }
      // Container 2
      .two {
        .content {
          .piece {
            background: var(--g-200);
            &:nth-child(1) {
              left: 0%;
              top: 25%;
              height: 40px;
              width: 120px;
              animation-delay: 2s;
              animation-name: pieceLeft;
            }
            &:nth-child(2) {
              right: 15%;
              top: 35%;
              width: 180px;
              height: 50px;
              animation-delay: 2.5s;
              animation-name: pieceRight;
            }
            &:nth-child(3) {
              right: 10%;
              top: 80%;
              height: 20px;
              width: 160px;
              animation-delay: 3s;
              animation-name: pieceRight;
            }
          }
        }
      }
      // Container 3
      .three {
        .content {
          .piece {
            background: var(--g-100);
            &:nth-child(1) {
              left: 25%;
              top: 35%;
              height: 20px;
              width: 80px;
              animation-name: pieceLeft;
              animation-delay: 3.5s;
            }
            &:nth-child(2) {
              right: 10%;
              top: 55%;
              width: 140px;
              height: 40px;
              animation-name: pieceRight;
              animation-delay: 4s;
            }
            &:nth-child(3) {
              left: 40%;
              top: 68%;
              height: 20px;
              width: 80px;
              animation-name: pieceLeft;
              animation-delay: 4.5s;
            }
          }
        }
      }
    }
  }
`

export default Mobile
