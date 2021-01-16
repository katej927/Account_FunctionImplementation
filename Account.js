import React from "react";
import { SERVER, SIGNUP_API, SIGNIN_API } from "../../config";
import { Link } from "react-router-dom";
import "./Account.scss";

class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      firstnamehasValue: true,
      lastname: "",
      lastnamehasValue: true,
      email: "",
      emailCondition: true,
      emailhasValue: true,
      password: "",
      pwLengthCondition: true,
      passwordhasValue: true,
      checkPw: "",
      checkpwCondition: true,
      checkPwhasValue: true,
      adagreement: false,
      serviceagreement: false,
      isTrueserviceagreement: true,
    };
  }

  // 인풋의 변화연동
  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value,
      },
      () => this.secondCondition(),
    );
  };

  // 체크박스의 변화연동
  handleCheckbox = (e) => {
    const { name, checked } = e.target;
    this.setState(
      {
        [name]: checked,
      },
      () => this.secondCondition(),
    );
  };

  // onChange msg
  secondCondition = () => {
    const {
      firstname,
      firstnamehasValue,
      lastname,
      lastnamehasValue,
      email,
      emailCondition,
      emailhasValue,
      password,
      pwLengthCondition,
      passwordhasValue,
      checkPw,
      checkpwCondition,
      checkPwhasValue,
      adagreement,
      serviceagreement,
      isTrueserviceagreement,
    } = this.state;

    const checkemailCondition = email.includes("@"); // 이메일 @ 확인
    const checkpwLengthCondition =
      password.length >= 10 && password.length <= 30; // 비번 길이
    const checkpwConditionAll = password === checkPw; // 비번확인 모든 조건

    if (firstname) {
      this.setState({
        firstnamehasValue: true,
      });
    } else if (!firstname) {
      this.setState({
        firstnamehasValue: false,
      });
    }

    if (lastname) {
      this.setState({
        lastnamehasValue: true,
      });
    } else if (!lastname) {
      this.setState({
        lastnamehasValue: false,
      });
    }

    if (email) {
      this.setState({
        emailCondition: checkemailCondition,
        emailhasValue: true,
      });
    } else if (!email) {
      this.setState({
        emailCondition: true,
        emailhasValue: false,
      });
    }

    if (checkPw && password) {
      this.setState({
        checkpwCondition: checkpwConditionAll,
        checkPwhasValue: true,
      });
    } else if (!checkPw && password) {
      this.setState({
        checkpwCondition: true,
        checkPwhasValue: false,
      });
    }

    if (password) {
      this.setState({
        pwLengthCondition: checkpwLengthCondition,
        passwordhasValue: true,
      });
    } else if (!password) {
      this.setState({
        pwLengthCondition: true,
        passwordhasValue: false,
      });
    }

    if (serviceagreement) {
      this.setState({
        isTrueserviceagreement: true,
      });
    } else if (!serviceagreement) {
      this.setState({
        isTrueserviceagreement: false,
      });
    }
  };

  // 버튼 클릭시 실행되는 메소드
  handleBtn = () => {
    // 원래 조건 넣고 setState하는 자리
    const {
      firstname,
      firstnamehasValue,
      lastname,
      lastnamehasValue,
      email,
      emailCondition,
      emailhasValue,
      password,
      pwLengthCondition,
      passwordhasValue,
      checkPw,
      checkpwCondition,
      checkPwhasValue,
      adagreement,
      serviceagreement,
      isTrueserviceagreement,
    } = this.state;

    const allAcceptedAccountCondition =
      firstnamehasValue &&
      lastnamehasValue &&
      emailCondition &&
      pwLengthCondition &&
      checkpwCondition &&
      isTrueserviceagreement;

    if (!firstname) {
      this.setState({
        firstnamehasValue: false,
      });
    } else if (firstname) {
      this.setState({
        firstnamehasValue: true,
      });
    }

    if (!lastname) {
      this.setState({
        lastnamehasValue: false,
      });
    } else if (lastname) {
      this.setState({
        lastnamehasValue: true,
      });
    }

    if (!email) {
      this.setState({
        emailhasValue: false,
      });
    } else if (email) {
      this.setState({
        emailhasValue: true,
      });
    }

    if (!password) {
      this.setState({
        passwordhasValue: false,
      });
    } else if (password) {
      this.setState({
        passwordhasValue: true,
      });
    }

    if (!checkPw) {
      this.setState({
        checkPwhasValue: false,
      });
    } else if (checkPw) {
      this.setState({
        checkPwhasValue: true,
      });
    }

    if (!serviceagreement) {
      this.setState({
        isTrueserviceagreement: false,
      });
    } else if (serviceagreement) {
      this.setState({
        isTrueserviceagreement: true,
      });
    }

    // 모든 유효성 검사 체크
    if (!allAcceptedAccountCondition) {
      return;
    }

    fetch(SIGNUP_API, {
      method: "POST",
      body: JSON.stringify({
        //firstname: firstname,
        //lastname: lastname,
        email: email,
        password: password, // 로그인은 pw로 함.
        //adagreement: adagreement
      }),
    })
      .then((responce) => responce.json())
      .then((result) => {
        console.log({ result });

        //
        if (result.message === "SUCCESS") {
          //localStorage.setItem("token", result.Authorization);
          this.props.history.push("/"); //2주차에 마이페이지
          return;
        }

        alert("실패");
      });
  };

  render() {
    const {
      firstname,
      firstnamehasValue,
      lastname,
      lastnamehasValue,
      email,
      emailCondition,
      emailhasValue,
      password,
      pwLengthCondition,
      passwordhasValue,
      checkPw,
      checkpwCondition,
      checkPwhasValue,
      adagreement,
      serviceagreement,
      isTrueserviceagreement,
    } = this.state;

    console.log(this.state);
    return (
      <div className="account">
        <nav>네브바 자리</nav>
        <main>
          <section className="accountTitle">새 계정 만들기</section>
          <section className="inputCheckboxBundle">
            <article className="inputBundle">
              <div className="firstname accountTextInput">
                <p>이름</p>
                <input
                  type="text"
                  name="firstname"
                  onChange={this.handleInput}
                />
                {!firstnamehasValue && (
                  <p className="warningMsg">이름은 필수 입력 항목입니다.</p>
                )}
              </div>
              <div className="lastname accountTextInput">
                <p>성</p>
                <input
                  type="text"
                  name="lastname"
                  onChange={this.handleInput}
                />
                {!lastnamehasValue && (
                  <p className="warningMsg">성은 필수 입력 항목입니다.</p>
                )}
              </div>
              <div className="email accountTextInput">
                <p>이메일</p>
                <input type="text" name="email" onChange={this.handleInput} />
                {!emailhasValue && (
                  <p className="warningMsg">이메일은 필수 입력 항목입니다.</p>
                )}
                {!emailCondition && (
                  <p className="warningMsg">이메일 형식이 아닙니다.</p>
                )}
              </div>
              <div className="password accountTextInput">
                <p>비밀번호</p>
                <input
                  type="password"
                  name="password"
                  onChange={this.handleInput}
                />
                {!passwordhasValue && (
                  <p className="warningMsg">비밀번호은 필수 입력 항목입니다.</p>
                )}
                {!pwLengthCondition && (
                  <p className="warningMsg">
                    비밀번호는 최소 10자, 최대 30자여야 합니다.
                  </p>
                )}
              </div>
              <div className="checkPw accountTextInput">
                <p>비밀번호 확인</p>
                <input
                  type="password"
                  name="checkPw"
                  onChange={this.handleInput}
                />
                {!checkPwhasValue && (
                  <p className="warningMsg">비밀번호는 필수 입력 항목입니다.</p>
                )}
                {!checkpwCondition && (
                  <p className="warningMsg">비밀번호가 일치 하지 않습니다.</p>
                )}
              </div>
            </article>
            <article className="checkboxBundle">
              <div className="firstCheckboxBundle">
                <div className="agreement adInputTitleDiv">
                  <div className="labelDiv">
                    <input
                      id="firstCheckbox"
                      type="checkbox"
                      name="adagreement"
                      onClick={this.handleCheckbox}
                    />
                    <label for="firstCheckbox"></label>
                  </div>
                  <span className="agreement adtitle">
                    네, <span className="specificFont">Bang & Olaf</span> 통신을
                    받고 싶습니다
                  </span>
                </div>
                <div className="agreement adDescription">
                  <span className="specificFont">Bang & Olaf</span> 및 당사
                  제품과 관련된 뉴스, 특별 혜택, 이벤트 및 특별 경연 초대장 등의
                  소식을 가장 먼저 받아보세요. 저희가 여러분께 소식을 가장 먼저
                  전해드리기 위해 여러분의 연락처 정보를 수집해야 합니다. 당사
                  통신에 대한 자세한 내용 읽기
                </div>
              </div>
              <div className="secondCheckboxBundle">
                <input
                  id="secondCheckbox"
                  type="checkbox"
                  name="serviceagreement"
                  onClick={this.handleCheckbox}
                />
                <label for="secondCheckbox"></label>
                <span className="agreement service">
                  동의 서비스 약관 & 개인정보 보호정책
                </span>
                {!isTrueserviceagreement && (
                  <p className="warningMsg">서비스 약관에 동의해야 합니다.</p>
                )}
              </div>
            </article>
          </section>
          <section className="registerMovetologinBundle">
            <button className="registrationBtn" onClick={this.handleBtn}>
              등록
            </button>
            <div>페이지의 로그로 이동</div>
          </section>
        </main>
        <footer>
          <span>KOREAN</span>
          <div>
            <Link to="/">
              <a>@ 2021 Bang & Olaf</a>
            </Link>
            <a>개인정보 보호정책</a>
            <a>서비스 약관</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Account;
