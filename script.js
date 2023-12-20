function updateTable() {
    var tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
  
    var data = JSON.parse(localStorage.getItem('mainKey')) || [];
  
    if (data.length === 0) {
      var emptyRow = '<tr><td colspan="3">emptyHeader</td></tr>';
      tbody.innerHTML = emptyRow;
    } else {
      for (var i = 0; i < data.length; i++) {
        var row = '<tr><td>' + data[i].column1 + '</td><td>' + data[i].column2 + '</td><td><span onclick="deleteItem(\'' + data[i].key + '\')">X</span></td></tr>';
        tbody.innerHTML += row;
      }
    }
  }
  
  window.onload = function() {
    updateTable();
  };
  
  var currentStorage;
  
  function getStorage() {
    currentStorage = localStorage;
  
    updateTable();
  }
  
  function saveItem(key, value) {
    var data = JSON.parse(localStorage.getItem('mainKey')) || [];
    data.push({ key: key, column1: value.column1, column2: value.column2 });
    localStorage.setItem('mainKey', JSON.stringify(data));
  
    updateTable();
  }
  
  function deleteItem(key) {
    var confirmation = confirm("Вы уверены, что хотите удалить эту запись?");
    
    if (confirmation) {
      var data = JSON.parse(localStorage.getItem('mainKey')) || [];
      data = data.filter(function(item) {
        return item.key !== key;
      });
      localStorage.setItem('mainKey', JSON.stringify(data));
  
      updateTable();
    }
  }
  
  function clearStorage() {
    var confirmation = confirm("Вы уверены, что хотите полностью очистить локальное хранилище?");
    
    if (confirmation) {
      localStorage.removeItem('mainKey');
  
      updateTable();
    }
  }
  
    window.onload = function() {
      getStorage();
    };
  
    function addNewItem() {
      var column1Value = document.getElementById('column1').value;
      var column2Value = document.getElementById('column2').value;
      var key = 'item_' + new Date().getTime();
  
      var newItem = {
        column1: column1Value,
        column2: column2Value
      };
  
      saveItem(key, newItem);
  
      document.getElementById('addForm').reset();
    };