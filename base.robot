*** Settings ***

Library         AppiumLibrary
Library         FakerLibrary    locale=pt_BR
Library         RequestsLibrary

#Utils
Resource     android/utils/commons.robot
Resource     android/utils/config.robot

#Pages
Resource     android/page/registerPage.robot
Resource     android/page/loginPage.robot
