class practicePage {


    elements = {


        practicePageHeader: () => cy.xpath("//h1[text()='Practice Page']",{timeout:10000}),
        dropDown: () => cy.get("#dropdown-class-example"),
        uploadFile: () => cy.xpath("//*[text()='Upload your image here']/..//input[@type='file']"),
        uploadedFile:() => cy.xpath("//*[text()='Upload your image here']/..//img"),
        openTab: () => cy.get("#opentab"),
        alertTextBox: () => cy.get("#name"),
        alertButton: () => cy.get("#alertbtn"),
        newTabButton: () => cy.get('#opentab'),
        confirmButton: () => cy.get("#confirmbtn"),
        hideButton: () => cy.get("#hide-textbox"),
        showButton: () => cy.get("#show-textbox"),
        hideShowTextBox:() => cy.get("#displayed-text"),
        mouseHoverButton:() => cy.xpath("//*[text()='Hover']/..//button"),
        mouseHoverLink1:() => cy.xpath("//*[@class='hover-content hovered']/a[1]"),
        iframeLayout:() => cy.id("#courses-iframe"),
        youtubeLink:() => cy.xpath("//a[text()='Youtube']")

    }

}


module.exports = new practicePage();


require('cypress-xpath') // using this library to find elements using xpath in cypress using cy.xpath() command