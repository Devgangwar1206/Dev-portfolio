import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer Intern</h4>
                <h5>iNexarum Private Limited</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Feb 2026 – Aug 2026 • Contributed to frontend and backend development
              of web applications during a six-month Full Stack Developer internship.
              Collaborated with senior developers on application architecture, debugged
              critical issues, and followed structured Git development workflows.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science</h4>
                <h5>Ajay Kumar Garg Engg. College</h5>
              </div>
              <h3>2027</h3>
            </div>
            <p>
              2023 – 2027 (Expected) • Ghaziabad, Uttar Pradesh • CGPA: 7.6/10.
              Comprehensive foundation in Core Java, Object-Oriented Programming,
              Database Management Systems, Data Structures, and Software Engineering.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intermediate (UP Board)</h4>
                <h5>C.L.V.P. SVM Inter College</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              2020 – 2022 • Pilibhit, Uttar Pradesh • Completed Intermediate
              education with a strong academic background in Mathematics, Physics,
              and Computer Science fundamentals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
