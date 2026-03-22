.hotel-hero {
  padding: 22px 0 10px;
}

.hotel-hero-box,
.hotel-sub-intro {
  background: #fafafa;
  border-radius: 28px;
  padding: 22px 26px;
  box-shadow: 0 12px 28px rgba(27, 38, 79, 0.04);
}

.hotel-sub-intro {
  margin-top: 20px;
}

.hotel-hero-label,
.hotel-sub-label,
.hotel-course-back-kicker {
  margin: 0 0 10px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: #7d6f8b;
}

.hotel-hero-box h1,
.hotel-sub-intro h2 {
  margin: 0 0 10px;
  font-size: clamp(2.2rem, 4vw, 4rem);
  line-height: 1.08;
  color: #162657;
  font-weight: 900;
}

.hotel-hero-tagline {
  margin: 0 0 10px;
  font-size: 1.08rem;
  font-weight: 800;
  color: #20315d;
}

.hotel-hero-description,
.hotel-sub-intro p {
  margin: 0;
  line-height: 1.8;
  color: #6a7892;
}

.hotel-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 18px;
}

.hotel-tab {
  min-height: 42px;
  padding: 0 16px;
  border: none;
  border-radius: 999px;
  background: #eaf0f6;
  color: #162657;
  font-weight: 800;
  cursor: pointer;
}

.hotel-tab.is-active {
  background: #23345e;
  color: #fff;
}

.hotel-slider-block {
  margin-top: 18px;
}

.card-slider-wrap {
  position: relative;
}

.card-slider-track {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.guide-card {
  background: #fff;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 10px 22px rgba(27, 38, 79, 0.05);
}

.guide-card-image {
  height: 220px;
  background: #e8e8e8;
}

.guide-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.guide-card-body {
  padding: 16px 16px 18px;
}

.guide-card-body h3 {
  margin: 0 0 8px;
  font-size: 1.05rem;
  font-weight: 900;
  color: #162657;
}

.guide-card-body p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.7;
  color: #6a7892;
}

.slider-controls {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 14px;
}

.slider-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 8px 18px rgba(27, 38, 79, 0.08);
  cursor: pointer;
}

.hotel-info-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 18px;
  margin-bottom: 30px;
}

.hotel-info-box {
  background: #fff;
  border-radius: 24px;
  padding: 18px 18px 14px;
  box-shadow: 0 10px 22px rgba(27, 38, 79, 0.05);
}

.info-box-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.info-kicker {
  font-size: 0.8rem;
  font-weight: 900;
  color: #e0a4b5;
}

.info-box-head h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 900;
  color: #162657;
}

.info-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.info-list-row {
  display: grid;
  grid-template-columns: 30px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 14px 0;
  border-top: 1px solid #efe6eb;
}

.info-list-row:first-child {
  border-top: none;
  padding-top: 0;
}

.list-number {
  font-size: 0.82rem;
  font-weight: 900;
  color: #e0a4b5;
}

.list-content {
  min-width: 0;
}

.list-title,
.course-title-btn {
  display: inline-block;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  font-size: 0.98rem;
  font-weight: 800;
  color: #162657;
  text-align: left;
  cursor: pointer;
  text-decoration: none;
}

.link-title:hover,
.course-title-btn:hover {
  opacity: 0.82;
}

.list-sub {
  display: block;
  margin-top: 4px;
  font-size: 0.84rem;
  line-height: 1.55;
  color: #7b879d;
}

.course-view-btn,
.list-action-btn,
.hotel-mini-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  padding: 0 12px;
  border: none;
  border-radius: 999px;
  background: #23345e;
  color: #fff;
  font-size: 0.76rem;
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
}

/* flip course box */
.hotel-course-flip {
  perspective: 1400px;
  min-height: 340px;
  padding: 0;
  overflow: hidden;
}

.hotel-course-flip-inner {
  position: relative;
  min-height: 340px;
  width: 100%;
  transform-style: preserve-3d;
  transition: transform 0.75s ease;
}

.hotel-course-flip.is-flipped .hotel-course-flip-inner {
  transform: rotateY(180deg);
}

.hotel-course-face {
  position: absolute;
  inset: 0;
  padding: 18px 18px 14px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: #fff;
  border-radius: 24px;
}

.hotel-course-face-front {
  z-index: 2;
}

.hotel-course-face-back {
  transform: rotateY(180deg);
  cursor: pointer;
}

.hotel-course-back-kicker {
  margin: 0 0 10px;
}

.hotel-course-back-title {
  margin: 0 0 10px;
  font-size: 2rem;
  line-height: 1.15;
  color: #162657;
  font-weight: 900;
}

.hotel-course-back-route {
  margin: 0 0 12px;
  font-weight: 800;
  color: #1f315d;
  line-height: 1.7;
}

.hotel-course-back-desc {
  margin: 0 0 16px;
  line-height: 1.8;
  color: #6a7892;
}

.hotel-theme-soraniwa .hotel-hero-box {
  background: #f6faf8;
}

.hotel-theme-hiyori .hotel-hero-box {
  background: #f8f7fb;
}

.hotel-theme-stitch .hotel-hero-box {
  background: #f7f8fb;
}

@media (max-width: 1100px) {
  .card-slider-track {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hotel-info-grid {
    grid-template-columns: 1fr;
  }

  .hotel-course-flip,
  .hotel-course-flip-inner {
    min-height: 300px;
  }
}

@media (max-width: 700px) {
  .card-slider-track {
    grid-template-columns: 1fr;
  }

  .hotel-hero-box,
  .hotel-sub-intro,
  .hotel-info-box,
  .hotel-course-face {
    border-radius: 20px;
    padding: 18px;
  }

  .info-list-row {
    grid-template-columns: 24px 1fr;
  }

  .course-view-btn,
  .list-action-btn {
    grid-column: 2 / 3;
    justify-self: start;
    margin-top: 8px;
  }

  .hotel-course-back-title {
    font-size: 1.5rem;
  }
}
