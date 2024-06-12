import { faker } from "@faker-js/faker";

describe('Testes Login de Usuários', function () {
    var randomPassword;

    it('Deve ser possível realizar o login com o email e senha', function () {
        cy.logaUsuario()
            .then((response) => {
                expect(response.status).to.equal(200);
            })
    });

    it('Não deve ser possível realizar o login sem preencher o email', function () {
        randomPassword = faker.internet.password({ length: 6 });

        const fakeUserData = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: randomPassword
        };

        cy.request({
            method: 'POST',
            url: '/users',
            body: fakeUserData
        });

        cy.request({
            method: 'POST',
            url: '/auth/login',
            body: {
                password: fakeUserData.password
            },
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.include('email should not be empty');
                expect(response.body.message).to.include('email must be an email');
            });
    });

    it('Não deve ser possível realizar o login sem preencher a senha', function () {
        randomPassword = faker.internet.password({ length: 6 });

        const fakeUserData = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: randomPassword
        };

        cy.request({
            method: 'POST',
            url: '/users',
            body: fakeUserData
        });

        cy.request({
            method: 'POST',
            url: '/auth/login',
            body: {
                email: fakeUserData.email
            },
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.include('password must be a string');
                expect(response.body.message).to.include('password should not be empty');
            });
    });

    it('Não deve ser possível realizar o login com um email incorreto', function () {
        randomPassword = faker.internet.password({ length: 6 });

        const fakeUserData = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: randomPassword
        };

        cy.request({
            method: 'POST',
            url: '/users',
            body: fakeUserData
        });

        cy.request({
            method: 'POST',
            url: '/auth/login',
            body: {
                email: faker.internet.email(),
                password: fakeUserData.password
            },
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.equal(401);
                expect(response.body.message).to.include('Invalid username or password.');
            });
    });

    it('Não deve ser possível realizar o login com uma senha incorreta', function () {
        randomPassword = faker.internet.password({ length: 6 });

        const fakeUserData = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: randomPassword
        };

        cy.request({
            method: 'POST',
            url: '/users',
            body: fakeUserData
        });

        cy.request({
            method: 'POST',
            url: '/auth/login',
            body: {
                email: fakeUserData.email,
                password: faker.internet.password()
            },
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.equal(401);
                expect(response.body.message).to.include('Invalid username or password.');
            });
    });
});