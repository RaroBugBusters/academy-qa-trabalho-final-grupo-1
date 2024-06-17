import { Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import { LoginUsuario } from "../pages/loginUsuario";
import { faker } from "@faker-js/faker";
Login = new LoginUsuario();

Given('que acessei a página de login', function () {
    cy.visit('/login');
  });


When('coloco a minha senha', function () {
    Login.digitarSenha('123456');
    });
    
  
When("confirmo a operação", function () {
    Login.clicarLogin();
  });

When('não coloco a minha senha', function () {
  });

 
When('digito a senha incorreta', function () {
    Login.digitarSenha ('12355555');
   });
      

Then('coloco meu email', function () {
    Login.digitarEmail('carolteste@email.com');
    });
  
Then('eu não digito o email', function () {;
});

