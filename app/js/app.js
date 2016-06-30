var nodes = [];
var edges = [];
var connectionCount = [];
var network = null;
var template;
var hashContainers = [];
var di = {
  selected: null
};


var searchTimeout;
function doSearch(event) {
  if (searchTimeout)
    clearTimeout(searchTimeout);


  searchTimeout = setTimeout(function() {
    var searchTerm = $('#txtSearchDockerImages').val();
    if (searchTerm.length <= 1) {
      return;
    }

    var url = 'https://hub.docker.com/v2/search/repositories/?page=1&query='+encodeURIComponent(searchTerm)+'&page_size=20';

    $('#listDockerImages ul').remove();
    $('#listDockerImages').append($('<ul class="list-result"><li>Looking for docker images ...</li></ul>'));
    $.ajax({
      url: url,
      success: function(response) {
        var html = template(response);

        $('#listDockerImages ul').remove();
        $('#listDockerImages').append(html);

        applyDragDrop();
      }
    })
  }, 500);
}

$(document).ready(function() {
  $('#txtSearchDockerImages').keyup(doSearch);

  var source   = $("#listDockerImageItemTemplate").html();
  template = Handlebars.compile(source);


  // Add tabs terminal
  $('.tabs li').click(function() {
    var tab_id = $(this).attr('data-tab');

    $('.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
  });

  // Resizable
  $('.bottom-content').resizable({
    handles: "n",
    minHeight: 100,
    maxHeight: 300
  });

  // Accordion
  $('.accordion .accordion-heading:first-child').next().show();
  $('.accordion .accordion-heading').click(function() {
    var $this = $(this);
    if ($this.next().hasClass('show')) {
      $this.find('.icon-toggle').removeClass('open');
      $this.next().removeClass('show');
      $this.next().slideUp(350);
    } else {
      $this.find('.icon-toggle').addClass('open');
      $this.next().addClass('show');
      $this.next().slideDown(350);
    }
  });


  // testing only
  // var response = {"count": 3756, "next": "https://hub.docker.com/v2/search/repositories/?query=mysql&page=2&page_size=20", "previous": null, "results": [{"star_count": 2547, "pull_count": 20803174, "repo_owner": null, "short_description": "MySQL is a widely used, open-source relational database management system (RDBMS).", "is_automated": false, "is_official": true, "repo_name": "mysql"}, {"star_count": 164, "pull_count": 211591, "repo_owner": null, "short_description": "Optimized MySQL Server Docker images. Created, maintained and supported by the MySQL team at Oracle", "is_automated": true, "is_official": false, "repo_name": "mysql/mysql-server"}, {"star_count": 0, "pull_count": 1191, "repo_owner": null, "short_description": "MySQL (MariaDB fork) Docker image.", "is_automated": true, "is_official": false, "repo_name": "tozd/mysql"}, {"star_count": 45, "pull_count": 5857293, "repo_owner": null, "short_description": "Image containing mysql. Optimized to be linked to another image/container.", "is_automated": true, "is_official": false, "repo_name": "centurylink/mysql"}, {"star_count": 8, "pull_count": 48941, "repo_owner": null, "short_description": "Centos/Debian Based Customizable MySQL Container - Updated 06/16/2016", "is_automated": true, "is_official": false, "repo_name": "appcontainers/mysql"}, {"star_count": 2, "pull_count": 729, "repo_owner": null, "short_description": "Docker Mysql", "is_automated": true, "is_official": false, "repo_name": "alterway/mysql"}, {"star_count": 2, "pull_count": 499, "repo_owner": null, "short_description": "MySQL for Drupal", "is_automated": true, "is_official": false, "repo_name": "drupaldocker/mysql"}, {"star_count": 2, "pull_count": 395, "repo_owner": null, "short_description": "Yfix docker built mysql", "is_automated": true, "is_official": false, "repo_name": "yfix/mysql"}, {"star_count": 1, "pull_count": 486, "repo_owner": null, "short_description": "MySQL server image", "is_automated": true, "is_official": false, "repo_name": "phpmentors/mysql"}, {"star_count": 0, "pull_count": 247670, "repo_owner": null, "short_description": "Improved `mysql` service with support for `mysqld_safe` and `fixtures` loaded from `mysqldump.sql`", "is_automated": true, "is_official": false, "repo_name": "cloudposse/mysql"}, {"star_count": 0, "pull_count": 805, "repo_owner": null, "short_description": "MySQL service for nanobox.io", "is_automated": true, "is_official": false, "repo_name": "nanobox/mysql"}, {"star_count": 36, "pull_count": 1192550, "repo_owner": null, "short_description": "", "is_automated": true, "is_official": false, "repo_name": "sameersbn/mysql"}, {"star_count": 0, "pull_count": 2111, "repo_owner": null, "short_description": "Build for MySQL. Project available on https://github.com/vukor/docker-web-stack", "is_automated": true, "is_official": false, "repo_name": "vukor/mysql"}, {"star_count": 6, "pull_count": 1485, "repo_owner": null, "short_description": "MySQL Server based on Ubuntu 14.04", "is_automated": true, "is_official": false, "repo_name": "marvambass/mysql"}, {"star_count": 0, "pull_count": 1770, "repo_owner": null, "short_description": "MySQL is a widely used, open-source relational database management system (RDBMS).", "is_automated": true, "is_official": false, "repo_name": "lancehudson/docker-mysql"}, {"star_count": 1, "pull_count": 104, "repo_owner": null, "short_description": "MySQL images with my own config files.", "is_automated": true, "is_official": false, "repo_name": "sin30/mysql"}, {"star_count": 2, "pull_count": 3131, "repo_owner": null, "short_description": "Docker image to run MySQL by Azuki - http://azk.io", "is_automated": true, "is_official": false, "repo_name": "azukiapp/mysql"}, {"star_count": 1, "pull_count": 75, "repo_owner": null, "short_description": "mysql", "is_automated": true, "is_official": false, "repo_name": "kaluzki/mysql"}, {"star_count": 0, "pull_count": 113, "repo_owner": null, "short_description": "akilli/base based MySQL image", "is_automated": true, "is_official": false, "repo_name": "akilli/mysql"}, {"star_count": 0, "pull_count": 208, "repo_owner": null, "short_description": "MySQL", "is_automated": true, "is_official": false, "repo_name": "livingobjects/mysql"}]};
  // var html = template(response);
  //
  // $('#listDockerImages ul').remove();
  // $('#listDockerImages').append(html);
  //
  // applyDragDrop();
});

function applyDragDrop() {
  $( "#listDockerImages li" ).draggable({
    helper: "clone"
  });

  $( "#myCanvas" ).droppable({
    tolerance: 'pointer',
    drop: function(event, ui) {
      console.log(event, ui);

      var canvasOffset = $( "#myCanvas canvas" ).offset();
      addNode(nodes.length, ui.helper.attr('data-tag'), {
        description: '',
        x: ui.offset.left - canvasOffset.left - ($( "#myCanvas canvas" ).width() / 2) + 150,
        y: ui.offset.top - canvasOffset.top - ($( "#myCanvas canvas" ).height() / 2) + 50
      });
    }
  });
}

var nodesData = [], edgesData = [];
var seed = 2;

function destroy() {
  if (network !== null) {
    network.destroy();
    network = null;
  }
}

function addNode(id, label, options) {
  try {
    var container = {
      id: id,
      label: label,
      tag: label,
      description: options.description,
      shape: 'box',
      x: options.x,
      y: options.y
    };

    nodes.add(container);

    hashContainers.push(new Container(container));
  }
  catch (err) {
    alert(err);
  }
}

function findContainer(id) {
  return hashContainers.filter(function(item) {
    return item.id == id;
  });
}

function draw() {
  destroy();
  nodes = new vis.DataSet();
  edges = new vis.DataSet();

  nodes.add(nodesData);
  edges.add(edgesData);
  var data = {
      nodes: nodes,
      edges: edges
  };

  // create a network
  var container = document.getElementById('myCanvas');
  var options = {
    layout: {randomSeed:seed}, // just to make sure the layout is the same when the locale is changed
    locale: 'en',
    height: '100%',
    width: '100%',
    edges: {
      arrows: {
        to: {enabled: true, scaleFactor: 1}
      },
      shadow: true,
      smooth: {
        enabled: true,
        type: "dynamic",
        roundness: 0.5
      },
      physics: true,
      scaling: {
        min: 1,
        max: 15,
        label: {
          enabled: true,
          min: 14,
          max: 30,
          maxVisible: 30,
          drawThreshold: 5
        },
        customScalingFunction: function (min,max,total,value) {
          if (max === min) {
            return 0.5;
          }
          else {
            var scale = 1 / (max - min);
            return Math.max(0,(value - min)*scale);
          }
        }
      },
      selectionWidth: 4
    },
    interaction:{
      dragView: false,
      zoomView: false,
      selectConnectedEdges: false
    },
    manipulation: {
      enabled: true,
      initiallyActive: true,
      addNode: function (data, callback) {
        // filling in the popup DOM elements
        document.getElementById('operation').innerHTML = "Add Node";
        document.getElementById('node-id').value = data.id;
        document.getElementById('node-label').value = data.label;
        document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
        document.getElementById('cancelButton').onclick = clearPopUp.bind();
        document.getElementById('network-popUp').style.display = 'block';
      },
      editNode: function (data, callback) {
        // filling in the popup DOM elements
        document.getElementById('operation').innerHTML = "Edit Node";
        document.getElementById('node-id').value = data.id;
        document.getElementById('node-label').value = data.label;
        document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
        document.getElementById('cancelButton').onclick = cancelEdit.bind(this,callback);
        document.getElementById('network-popUp').style.display = 'block';
      },
      addEdge: function (data, callback) {
        if (data.from == data.to) {
          var r = confirm("Do you want to connect the node to itself?");
          if (r == true) {
            callback(data);
          }
        }
        else {
          callback(data);
        }
      }
    },
    physics:{
      solver: 'barnesHut',
      enabled: false
    }
  };

  rivets.binders.input = {
    publishes: true,
    routine: rivets.binders.value.routine,
    bind: function (el) {
        el.addEventListener('input', this.publish);
    },
    unbind: function (el) {
        el.removeEventListener('input', this.publish);
    }
  };

  network = new vis.Network(container, data, options);

  network.on('release', function(a,b,c,d) {
    console.log(a, b, c, d);
  });
  network.on("select", function(params) {
    // if selected item is a node
    console.log(params);
    if (params.nodes.length > 0) {
      var filters = findContainer(params.nodes[0]);
      if (filters.length) {
        di.selected = filters[0];
      } else {
        di.selected = null;
      }

      rivets.bind($('#containerProps'), {prop: di.selected})
    } else { // if selected item is an edge

    }
  })
}

function clearPopUp() {
  document.getElementById('saveButton').onclick = null;
  document.getElementById('cancelButton').onclick = null;
  document.getElementById('network-popUp').style.display = 'none';
}

function cancelEdit(callback) {
  clearPopUp();
  callback(null);
}

function saveData(data,callback) {
  data.id = document.getElementById('node-id').value;
  data.label = document.getElementById('node-label').value;
  clearPopUp();
  callback(data);
}

Handlebars.registerHelper('isEmpty', function(arr, options) {
  if(arr.length == 0) {
    return options.fn(this);
  }
  return options.inverse(this);
});
