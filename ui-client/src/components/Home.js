import Card from "./Card";
function Home() {
  return (
    <div id="home" className="home-background">
      <div className="right">
        <Card
          className="card mb-3"
          maxWidth="26rem"
          txtcolor="black"
          header="Green Mountain Bank"
          title="Welcome to Green Mountain Bank"
          text="Trust us with your business and we promise to keep you rolling in the green."
          body={<img src="bank-logo.png" className="img-fluid" alt="Logo" />}
        />
      </div>
    </div>
  );
}

export default Home;
