import { faker } from "@faker-js/faker";

describe('Testes Registro de Usuários', function () {
    var randomPassword;

    it('Criar um usuário preenchendo os campos obrigatórios deve retornar sucesso', function () {
        cy.logaUsuario();
    });

    it('O usuário criado deve ser tipo 0 (administrador)', function () {
        const fakeUserData = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 6 })
        };
        cy.request({
            method: 'POST',
            url: '/users',
            body: fakeUserData,
        })
            .then((response) => {
                expect(response.status).to.equal(201);
                expect(response.body).to.have.property('type', 0);
            });
    });

    it('Criar um usuário sem preencher o campo nome deve retornar erro', function () {
        randomPassword = '1234567'

        const fakeUserData = {
            email: faker.internet.email(),
            password: randomPassword
        };
        cy.request({
            method: 'POST',
            url: '/users',
            body: fakeUserData,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.include('name must be longer than or equal to 1 characters')
                expect(response.body.message).to.include('name must be a string')
                expect(response.body.message).to.include('name should not be empty')
            });
    });

    it('Criar um usuário sem preencher o campo e-mail deve retornar erro', function () {
        randomPassword = '1234567'

        const fakeUserData = {
            name: faker.person.fullName(),
            password: randomPassword
        };
        cy.request({
            method: 'POST',
            url: '/users',
            body: fakeUserData,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.include('email must be longer than or equal to 5 characters')
                expect(response.body.message).to.include('email must be an email')
                expect(response.body.message).to.include('email should not be empty')
            });
    });

    it('Criar um usuário sem preencher o campo senha deve retornar erro', function () {
        const fakeUserData = {
            name: faker.person.fullName(),
            email: faker.internet.email()
        };
        cy.request({
            method: 'POST',
            url: '/users',
            body: fakeUserData,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.include('password must be longer than or equal to 6 characters')
                expect(response.body.message).to.include('password must be a string')
                expect(response.body.message).to.include('password should not be empty')
            });
    });

    it('Nome com mais de 100 caracteres deve retornar erro', function () {
        randomPassword = '1234567'

        const fakeUserData = {
            name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            email: faker.internet.email(),
            password: randomPassword
        };
        cy.request({
            method: 'POST',
            url: '/users',
            body: fakeUserData,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.include('name must be shorter than or equal to 100 characters');
            });
    });

    it('Senha com menos de 6 caracteres deve retornar erro', function () {
        randomPassword = '12345'

        const fakeUserData = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: randomPassword
        };
        cy.request({
            method: 'POST',
            url: '/users',
            body: fakeUserData,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.include('password must be longer than or equal to 6 characters');
            });
    });

    it('Senha com mais de 12 caracteres deve retornar erro', function () {
        randomPassword = '1234567890123'

        const fakeUserData = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: randomPassword
        };
        cy.request({
            method: 'POST',
            url: '/users',
            body: fakeUserData,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.include('password must be shorter than or equal to 12 characters');
            });
    });

    it('Email sem .com deve retornar erro', function () {
        randomPassword = '123456'

        const fakeUserData = {
            name: faker.person.fullName(),
            email: 'teste@teste',
            password: randomPassword
        };
        cy.request({
            method: 'POST',
            url: '/users',
            body: fakeUserData,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.include('email must be an email');
            });
    });

    it('Email sem @ deve retornar erro', function () {
        randomPassword = '123456'

        const fakeUserData = {
            name: faker.person.fullName(),
            email: 'testeteste.com',
            password: randomPassword
        };
        cy.request({
            method: 'POST',
            url: '/users',
            body: fakeUserData,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.include('email must be an email');
            });
    });

    it('Email com mais de 60 caracteres deve retornar erro', function () {
        randomPassword = '123456'

        const fakeUserData = {
            name: faker.person.fullName(),
            email: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@aaaaaaaaaaaaaaaaaaaaaaaaaa.com',
            password: randomPassword
        };
        cy.request({
            method: 'POST',
            url: '/users',
            body: fakeUserData,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.include('email must be shorter than or equal to 60 characters');
            });
    });

    it('Não deve ser possível existir dois usuários com o mesmo email', function () {
        randomPassword = '123456'
        const randomEmail = faker.internet.email();

        const fakeUserData = {
            name: faker.person.fullName(),
            email: randomEmail,
            password: randomPassword
        };
        cy.request({
            method: 'POST',
            url: '/users',
            body: fakeUserData,
        });
        cy.request({
            method: 'POST',
            url: '/users',
            body: fakeUserData,
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.equal(409);
            expect(response.body.message).to.include('Email already in use');
        });
    });
});

