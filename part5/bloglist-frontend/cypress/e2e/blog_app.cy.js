describe("Blog app", function () {
  const user = {
    username: "tester",
    password: "password",
    name: "john doe",
  };

  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login");
    cy.get("#username").should("exist");
    cy.get("#password").should("exist");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("tester");
      cy.get("#password").type("password");
      cy.get("#login-button").click();
      cy.contains("john doe logged in");
    });
    it("fails with wrong credentials", function () {
      cy.get("#username").type("tester");
      cy.get("#password").type("psw");
      cy.get("#login-button").click();

      cy.get(".error").should("contain", "Wrong Credentials");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
      cy.get(".error").should("have.css", "border-style", "solid");
    });
  });
  describe("When logged in", function () {
    const newBlog = {
      title: "test title",
      author: "test author",
      url: "test url",
    };
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password });
    });

    it("A blog can be created", function () {
      cy.contains("create").click();
      cy.get("#title").type(newBlog.title);
      cy.get("#author").type(newBlog.author);
      cy.get("#url").type(newBlog.url);
      cy.contains("Save").click();

      cy.contains("test title");
    });

    it("A blog can be liked", () => {
      cy.createBlog({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      });
      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains("likes: 1").should("exist");
    });

    it("A blog can be deleted", () => {
      cy.createBlog({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      });
      cy.contains("view").click();
      cy.contains("Remove").click();
      cy.contains(newBlog.title).should("not.exist");
    });

    it("A blog cannot be deleted by another user", () => {
      const user2 = {
        username: "tester2",
        password: "password2",
        name: "john doe",
      };
      cy.createBlog({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      });
      cy.contains("logout").click();
      cy.request("POST", "http://localhost:3003/api/users", user2);
      cy.login({ username: user2.username, password: user2.password });
      cy.contains("view").click();
      cy.contains("Remove").should("not.exist");
    });

    it("Blogs are ordered according to likes", () => {
      cy.createBlog({
        title: "The title with the most likes",
        author: "new author",
        url: "new url",
      });
      cy.contains("The title with the most likes").contains("view").click();
      cy.contains("like").click().click().click();
      cy.contains("hide").click();

      cy.createBlog({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      });
      cy.contains("test title").contains("view").click();
      cy.contains("like").click();

      cy.get(".blog").eq(0).should("contain", "The title with the most likes");
      cy.get(".blog").eq(1).should("contain", "test title");
    });
  });
});
