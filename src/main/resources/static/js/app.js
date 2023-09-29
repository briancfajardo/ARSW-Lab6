

let app = (function (api){
    let _author = "";
    let _blueprints = [];
    let publicFunctions = {};

    /*
    * 1. Verifica si el documento html ya se encuentra cargado
    * 2. Convierte los datos en un objeto
    * 3. Crea la tabla con los elementos del objeto
    * 4. Calcula el total de puntos
    * 5. Muestra los resultados
    */
    let _bpTable = (data) => {
        $(document).ready(() => {
            console.log(data);
            let object = _convToObj(data);
            _createTable(object, data);
            _totalPoints(object);
            _blueprints = object;
        });
    }

    let _convToObj = (data) => {
        return data.map((elem) => ({
            name: elem.name,
            numPoints: elem.points.length
        }));
    }

    let _createTable = (obj, data) => {
        $("#author").text(`${data[0].author}'s blueprints`);
        $("#blueprints tbody").text("");
        obj.map((elem) => {
            let rows = `
            <tr>
                <td>${elem.name}</td>
                <td>${elem.numPoints}</td>
                <td><button>Open</button></td>
            </tr>`;
            $("#blueprints tbody").append(rows);
        })
    }

    let _totalPoints = (data) => {
        let totalPoints = data.reduce((total, i) => total + i.numPoints, 0);
        $("#total-points").html(totalPoints);
    }

    publicFunctions.setName = function (newName) {
        _author = newName;
    }

    publicFunctions.updateBlueprints = function (authorName){
        api.getBlueprintsByAuthor(authorName, _bpTable);
    }
    return publicFunctions;
})(apimock);