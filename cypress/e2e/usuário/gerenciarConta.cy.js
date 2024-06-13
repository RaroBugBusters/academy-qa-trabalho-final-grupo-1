import { faker } from "@faker-js/faker";

describe('Testes Login de Usuários', function () {

    it('Um usuário autenticado pode acessar a edição das próprias informações', function () {
        cy.atualizaUsuario()
            .then((response) => {
                expect(response.status).to.equal(200);
            })
    });

    it('Um usuário pode alterar somente o nome e senha', function () {

    });

    it('Deve ser possível atualizar o nome sem atualizar a senha', function () {

    });

    it('Deve ser possível atualizar a senha sem atualizar o nome', function () {

    });

    it('Um usuário comum não pode alterar informações de outros usuários', function () {

    });

    it('Um usuário não autenticado não pode acessar a edição de informações', function () {

    });

    it('A senha só será se forem preenchidos os campos de senha e confirmação de senha')
    // NÃO FUNCIONA, SÓ TEM O CAMPO SENHA

    it('Não deve ser possível alterar para um nome em branco', function () {

    });

    it('Não deve ser possível alterar para um nome com mais de 100 caracteres', function () {

    });

    it('Não deve ser possível alterar para uma senha com menos de 6 caracteres', function () {

    });

    it('Não deve ser possível alterar para uma senha com mais de 12 caracteres', function () {

    });

});