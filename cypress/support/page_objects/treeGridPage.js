export class treeGridPage{
    
    searchInTreeGrid(searchText) {
        cy.get('[id="search"]').type(searchText);
        cy.get('tr, [class="nb-tree-grid-header-cell]').contains('size').click();
    }
}

export const onTreeGridPage = new treeGridPage()


