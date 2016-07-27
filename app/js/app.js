var nodes = [];
var edges = [];
var connectionCount = [];
var network = null;
var template;
var hashContainers = [];
var di = {
  selected: null,
  showContainerProps: false
};
var currentWorkflow = {

}


var searchTimeout;

function doSearch(event) {
  if (searchTimeout)
    clearTimeout(searchTimeout);


  searchTimeout = setTimeout(function() {
    var searchTerm = $('#txtSearchDockerImages').val();
    if (searchTerm.length <= 1) {
      return;
    }

    var url = 'https://hub.docker.com/v2/search/repositories/?page=1&query=' + encodeURIComponent(searchTerm) + '&page_size=20';

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

var dockerImage = new DockerImage();

$(document).ready(function() {
  $('#txtSearchDockerImages').keyup(doSearch);

  var source = $("#listDockerImageItemTemplate").html();
  template = Handlebars.compile(source);

  // Add tabs terminal
  $('.tabs li').click(function() {
    var tab_id = $(this).attr('data-tab');

    $('.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#" + tab_id).addClass('current');
  });

  // Resizable
  $('.bottom-content').resizable({
    handles: "n",
    minHeight: 100,
    maxHeight: 200
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
  var response = {
    "count": 3756,
    "next": "https://hub.docker.com/v2/search/repositories/?query=mysql&page=2&page_size=20",
    "previous": null,
    "results": [{
      "star_count": 2547,
      "pull_count": 20803174,
      "repo_owner": null,
      "short_description": "MySQL is a widely used, open-source relational database management system (RDBMS).",
      "is_automated": false,
      "is_official": true,
      "repo_name": "mysql"
    }, {
      "star_count": 164,
      "pull_count": 211591,
      "repo_owner": null,
      "short_description": "Optimized MySQL Server Docker images. Created, maintained and supported by the MySQL team at Oracle",
      "is_automated": true,
      "is_official": false,
      "repo_name": "mysql/mysql-server"
    }, {
      "star_count": 0,
      "pull_count": 1191,
      "repo_owner": null,
      "short_description": "MySQL (MariaDB fork) Docker image.",
      "is_automated": true,
      "is_official": false,
      "repo_name": "tozd/mysql"
    }, {
      "star_count": 45,
      "pull_count": 5857293,
      "repo_owner": null,
      "short_description": "Image containing mysql. Optimized to be linked to another image/container.",
      "is_automated": true,
      "is_official": false,
      "repo_name": "centurylink/mysql"
    }, {
      "star_count": 8,
      "pull_count": 48941,
      "repo_owner": null,
      "short_description": "Centos/Debian Based Customizable MySQL Container - Updated 06/16/2016",
      "is_automated": true,
      "is_official": false,
      "repo_name": "appcontainers/mysql"
    }, {
      "star_count": 2,
      "pull_count": 729,
      "repo_owner": null,
      "short_description": "Docker Mysql",
      "is_automated": true,
      "is_official": false,
      "repo_name": "alterway/mysql"
    }, {
      "star_count": 2,
      "pull_count": 499,
      "repo_owner": null,
      "short_description": "MySQL for Drupal",
      "is_automated": true,
      "is_official": false,
      "repo_name": "drupaldocker/mysql"
    }, {
      "star_count": 2,
      "pull_count": 395,
      "repo_owner": null,
      "short_description": "Yfix docker built mysql",
      "is_automated": true,
      "is_official": false,
      "repo_name": "yfix/mysql"
    }, {
      "star_count": 1,
      "pull_count": 486,
      "repo_owner": null,
      "short_description": "MySQL server image",
      "is_automated": true,
      "is_official": false,
      "repo_name": "phpmentors/mysql"
    }, {
      "star_count": 0,
      "pull_count": 247670,
      "repo_owner": null,
      "short_description": "Improved `mysql` service with support for `mysqld_safe` and `fixtures` loaded from `mysqldump.sql`",
      "is_automated": true,
      "is_official": false,
      "repo_name": "cloudposse/mysql"
    }, {
      "star_count": 0,
      "pull_count": 805,
      "repo_owner": null,
      "short_description": "MySQL service for nanobox.io",
      "is_automated": true,
      "is_official": false,
      "repo_name": "nanobox/mysql"
    }, {
      "star_count": 36,
      "pull_count": 1192550,
      "repo_owner": null,
      "short_description": "",
      "is_automated": true,
      "is_official": false,
      "repo_name": "sameersbn/mysql"
    }, {
      "star_count": 0,
      "pull_count": 2111,
      "repo_owner": null,
      "short_description": "Build for MySQL. Project available on https://github.com/vukor/docker-web-stack",
      "is_automated": true,
      "is_official": false,
      "repo_name": "vukor/mysql"
    }, {
      "star_count": 6,
      "pull_count": 1485,
      "repo_owner": null,
      "short_description": "MySQL Server based on Ubuntu 14.04",
      "is_automated": true,
      "is_official": false,
      "repo_name": "marvambass/mysql"
    }, {
      "star_count": 0,
      "pull_count": 1770,
      "repo_owner": null,
      "short_description": "MySQL is a widely used, open-source relational database management system (RDBMS).",
      "is_automated": true,
      "is_official": false,
      "repo_name": "lancehudson/docker-mysql"
    }, {
      "star_count": 1,
      "pull_count": 104,
      "repo_owner": null,
      "short_description": "MySQL images with my own config files.",
      "is_automated": true,
      "is_official": false,
      "repo_name": "sin30/mysql"
    }, {
      "star_count": 2,
      "pull_count": 3131,
      "repo_owner": null,
      "short_description": "Docker image to run MySQL by Azuki - http://azk.io",
      "is_automated": true,
      "is_official": false,
      "repo_name": "azukiapp/mysql"
    }, {
      "star_count": 1,
      "pull_count": 75,
      "repo_owner": null,
      "short_description": "mysql",
      "is_automated": true,
      "is_official": false,
      "repo_name": "kaluzki/mysql"
    }, {
      "star_count": 0,
      "pull_count": 113,
      "repo_owner": null,
      "short_description": "akilli/base based MySQL image",
      "is_automated": true,
      "is_official": false,
      "repo_name": "akilli/mysql"
    }, {
      "star_count": 0,
      "pull_count": 208,
      "repo_owner": null,
      "short_description": "MySQL",
      "is_automated": true,
      "is_official": false,
      "repo_name": "livingobjects/mysql"
    }]
  };
  var html = template(response);

  $('#listDockerImages ul').remove();
  $('#listDockerImages').append(html);

  applyDragDrop();

  $('#hostCommandInput').keyup(function(event) {
    if (event.which == 13) {
      var val = $('#hostCommandInput').val();
      if (val.trim() != '') {
        sendHostCommand(val);
      }
    }
  })
});

var cmdHistory = [];

function isContainerExisted(idOrName) {
  for (var key in nodes._data) {
    if (key == idOrName) {
      return true;
    }
  }
  return false;
}

var CommandLogger = {
  invalidCommand: function(cmd) {
    $('#containerHostCommandInput').before($('<div class="cmd">Unknown command: <i>' + cmd + '</i></div>'));
  },
  containerNotExist: function(idOrName) {
    $('#containerHostCommandInput').before($('<div class="cmd"><i>Container \"' + idOrName + '\" not exist</i></div>'));
  },
  imageNotExist: function(idOrName) {
    $('#containerHostCommandInput').before($('<div class="cmd"><i>Image: \"' + idOrName + '\" not exist</i></div>'));
  },
  log: function(str) {
    $('#containerHostCommandInput').before($('<div class="cmd">' + str + '</div>'));
  }
}


function sendHostCommand(cmd) {
  var addContainerPattern = /^workflow add ([\w\-\/\:\d]*)$/;
  var linkContainerPattern = /^workflow link ([\w\-\/\:\d]*) ([\w\-\/\:\d]*)$/;
  var testAdd = cmd.match(addContainerPattern);

  if (testAdd) {
    var imageName = testAdd[1];

    dockerImage.getDockerImageInfo(imageName, function(response) {
      console.log(response);
      addNode(imageName, {});
      $('#containerHostCommandInput').before($('<div class="cmd">' + cmd + '</div>'));
    }, function(err) {
      CommandLogger.imageNotExist(imageName);
    });


  } else if (cmd.match(linkContainerPattern)) {
    var testLink = cmd.match(linkContainerPattern);

    linkContainers(testLink[1], testLink[2]);
  } else {
    CommandLogger.invalidCommand(cmd);
  }

  cmdHistory.push(cmd);
  // clean up
  $('#hostCommandInput').val('');
}

var defaultBind = {
  showingContainerProps: false
};
function applyDragDrop() {
  $("#listDockerImages li, #listWorkflowControls li").draggable({
    helper: "clone",
    start: function(e, ui) {
      $(ui.helper).addClass("imageDraggableHelper");
    }
  });

  $("#myCanvas").droppable({
    tolerance: 'pointer',
    drop: function(event, ui) {
      console.log(event, ui);

      var uiType = ui.draggable.attr('data-type');
      var canvasOffset = $("#myCanvas canvas").offset();

      switch (uiType) {
        case 'flowcontrol-start':
          if (currentWorkflow.hasStartNode) {
            return;
          }

          console.log('drop flowcontrol-start');
          addNode(ui.helper.attr('data-tag'), {
            description: '',
            fixed: false,
            x: canvasOffset.left - ($("#myCanvas canvas").width() / 2) + 100,
            y: canvasOffset.top - ($("#myCanvas canvas").height() / 2),
            shape: 'circle',
            label: 'Start',
            type: uiType,
            font:{
              size:20
            },
            color: {
              background: '#FF9900'
            }
          });

          currentWorkflow.hasStartNode = true;
          break;
          case 'flowcontrol-end':
            if (currentWorkflow.hasEndNode) {
              return;
            }

            console.log('drop flowcontrol-end');
            addNode(ui.helper.attr('data-tag'), {
              description: '',
              fixed: false,
              x: canvasOffset.left - ($("#myCanvas canvas").width() / 2) + 100,
              y: canvasOffset.top + ($("#myCanvas canvas").height() / 2) - 300,
              shape: 'circle',
              label: 'End',
              type: uiType,
              font:{
                size:20
              },
              color: {
                background: '#FF9900'
              }
            });

            currentWorkflow.hasEndNode = true;
            break;
        case 'flowcontrol-condition':
          console.log('drop flowcontrol-condition');
          addNode(ui.helper.attr('data-tag'), {
            description: '',
            fixed: false,
            x: ui.offset.left - canvasOffset.left - ($("#myCanvas canvas").width() / 2) + 150,
            y: ui.offset.top - canvasOffset.top - ($("#myCanvas canvas").height() / 2) + 50,
            shape: 'diamond',
            label: 'Condition',
            type: uiType,
            size: 40,
            color: {
              background: '#CA7AFF'
            }
          });
          break;

          case 'flowcontrol-loop':
            console.log('drop flowcontrol-loop');
            addNode(ui.helper.attr('data-tag'), {
              description: '',
              fixed: false,
              group: 'loop',
              x: ui.offset.left - canvasOffset.left - ($("#myCanvas canvas").width() / 2) + 150,
              y: ui.offset.top - canvasOffset.top - ($("#myCanvas canvas").height() / 2) + 50,
              shape: 'circle',
              label: 'Loop',
              type: uiType,
              font:{
                size:20
              },
              color: {
                background: '#D1D175'
              }
            });

            break;
        default:
          addNode(ui.helper.attr('data-tag'), {
            description: '',
            x: ui.offset.left - canvasOffset.left - ($("#myCanvas canvas").width() / 2) + 150,
            y: ui.offset.top - canvasOffset.top - ($("#myCanvas canvas").height() / 2) + 50,
            type: 'docker-image'
          });
      }
    }
  });

  $('#containerProps').hide();
  $('#linkProps').hide();

  rivets.bind($('#containerProps'), defaultBind);
}


var nodesData = [],
  edgesData = [];
var seed = 2;

function destroy() {
  if (network !== null) {
    network.destroy();
    network = null;
  }
}

function getNextId() {
  var id = 0;
  for (var key in nodes._data) {
    if (id === 0) {
      id = parseInt(nodes._data[key].id);
    } else {
      var _currentID = parseInt(nodes._data[key].id);
      if (_currentID > id) {
        id = _currentID;
      }
    }
  }

  return ++id;
}

function linkContainers(srcID, desId) {
  // check if id1 && id2 has existed
  if (!isContainerExisted(srcID)) {
    CommandLogger.containerNotExist(srcID);
  } else if (!isContainerExisted(desId)) {
    CommandLogger.containerNotExist(desId);
  } else {
    edges.add({
      from: srcID,
      to: desId
    });
  }
}

function addNode(label, options) {
  var id = getNextId();
  try {
    var _defaultOptions = {
      id: id,
      label: label + '\nID: ' + id,
      font: {
        align: 'left'
      },
      // common
      tag: label,
      version: 'Latest',
      description: options.description,
      shape: 'box',
      // Build
      buildTag: '',
      buildCpu: ''
    };

    var container = $.extend(_defaultOptions, options);
    // if (!isNaN(options.x)) {
    //   container.x = options.x;
    // }
    // if (!isNaN(options.y)) {
    //   container.y = options.y;
    // }

    nodes.add(container);

    hashContainers.push(new Container(container));
  } catch (err) {
    alert(err);
  }
}

function findContainer(id) {
  for (var i in nodes._data) {
    if (nodes._data[i].id == id) {
      return nodes._data[i];
    }
  }
  return null;
}

function findLink(id) {
  for (var i in edges._data) {
    if (edges._data[i].id == id) {
      return edges._data[i];
    }
  }
  return null;
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

  var locales = {
    en: {
      edit: 'Edit',
      del: 'Delete selected',
      back: 'Back',
      addNode: 'Add Container',
      addEdge: 'Add Link',
      editNode: 'Edit Container',
      editEdge: 'Edit Link',
      addDescription: 'Click in an empty space to place a new container.',
      edgeDescription: 'Click on a container and drag the link to another container to connect them.',
      editEdgeDescription: 'Click on the control points and drag them to a container to connect to it.',
      createEdgeError: 'Cannot link to a cluster.',
      deleteClusterError: 'Clusters cannot be deleted.',
      editClusterError: 'Clusters cannot be edited.'
    }
  }

  var options = {
    layout: {
      randomSeed: seed
    }, // just to make sure the layout is the same when the locale is changed
    locale: 'en',
    locales: locales,
    height: '100%',
    width: '100%',
    groups: {
      loop: {color:{background:'red'}, borderWidth:3}
    },
    edges: {
      arrows: {
        to: {
          enabled: true,
          scaleFactor: 1
        },
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
        customScalingFunction: function(min, max, total, value) {
          if (max === min) {
            return 0.5;
          } else {
            var scale = 1 / (max - min);
            return Math.max(0, (value - min) * scale);
          }
        }
      },
      selectionWidth: 4
    },
    interaction: {
      dragView: false,
      zoomView: false,
      selectConnectedEdges: false,
      dragNodes: true
    },
    manipulation: {
      enabled: true,
      initiallyActive: true,
      addNode: function(data, callback) {
        // filling in the popup DOM elements
        document.getElementById('operation').innerHTML = "Add Node";
        document.getElementById('node-id').value = data.id;
        document.getElementById('node-label').value = data.label;
        document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
        document.getElementById('cancelButton').onclick = clearPopUp.bind();
        document.getElementById('network-popUp').style.display = 'block';
      },
      editNode: function(data, callback) {
        // filling in the popup DOM elements
        document.getElementById('operation').innerHTML = "Edit Node";
        document.getElementById('node-id').value = data.id;
        document.getElementById('node-label').value = data.label;
        document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
        document.getElementById('cancelButton').onclick = cancelEdit.bind(this, callback);
        document.getElementById('network-popUp').style.display = 'block';
      },
      addEdge: function(data, callback) {
        return addEdge(data, callback);
      }
    },
    physics: {
      solver: 'barnesHut',
      enabled: false
    }
  };

  function addEdge(linkOptions, callback) {
    var _from, _to;
    if (linkOptions.from != linkOptions.to) {
      _from = findContainer(linkOptions.from);
      _to = findContainer(linkOptions.to);

      console.log(_from, _to);

      if (_from.type == 'flowcontrol-condition') {
        if (['flowcontrol-condition', 'docker-image'].indexOf(_to.type) != -1) {

          if (!_from.hasTrueCondition) {
            linkOptions.label = "True";
            _from.hasTrueCondition = true;
            linkOptions.smooth = {
              enabled: true,
              type: 'curvedCW'
            }
          } else {
            linkOptions.label = "False";
            linkOptions.smooth = {
              enabled: true,
              type: 'curvedCCW'
            }
          }

          linkOptions.shadow = true;
          linkOptions.dashes = true;
          linkOptions.color = {
            color: '#ff0000'
          }

          edges.add(linkOptions);
        }
      } else if (['docker-image', 'flowcontrol-start', 'flowcontrol-loop'].indexOf(_from.type) != -1 && _to.type == 'docker-image') {
        if (['docker-image'].indexOf(_from.type) != -1) {
          linkOptions.smooth = {
            enabled: true,
            type: 'straightCross'
          }
        }

        edges.add(linkOptions);
      } else if (_to.type == 'flowcontrol-condition') {
        if (_from.type != 'docker-image') {
          edges.add(linkOptions);
        }
      }
      // callback(data);
    }
  }

  rivets.binders.input = {
    publishes: true,
    routine: rivets.binders.value.routine,
    bind: function(el) {
      el.addEventListener('input', this.publish);
    },
    unbind: function(el) {
      el.removeEventListener('input', this.publish);
    }
  };

  network = new vis.Network(container, data, options);

  network.on('release', function(a, b, c, d) {
    console.log(a, b, c, d);
  });

  var currentBinding = null;
  var currentLinkBinding = null;

  network.on("deselectEdge", function(params) {
    di.selected = null;
    $('#linkProps').hide();
    if (currentLinkBinding) {
      currentLinkBinding.unbind();
    }

    if (params.links.length == 0) {
      // TODO: Disable property inputs
    }
  });
  network.on("selectEdge", function(params) {
    if (params.edges.length > 0) {
      var filters = findLink(params.edges[0]);
      if (filters.length) {
        di.selectedLink = filters[0];
      } else {
        di.selectedLink = null;
      }

      $('#linkProps').show();

      currentLinkBinding = rivets.bind($('#linkProps'), {
        linkProps: di.selectedLink
      });
      console.log(currentBinding);
    }
  });

  network.on("selectNode", function(params) {
    // if selected item is a node
    defaultBind.showingContainerProps = true;
    if (params.nodes.length > 0) {
      var filters = findContainer(params.nodes[0]);

      console.log(filters);
      if (filters.length) {
        di.selected = filters[0];
      } else {
        di.selected = null;
      }

      $('.item-props').hide();

      switch (filters.type) {
        case 'flowcontrol-condition':
          $('#conditionProps').show();
        break;
        default:
          $('#containerProps').show();

          currentBinding = rivets.bind($('#containerProps'), {
            containerProps: di.selected
          });
          break;
      }
    }
  });

  network.on("deselectNode", function(params) {
    di.selected = null;
    $('#containerProps').hide();
    if (currentBinding) {
      currentBinding.unbind();
    }
    if (params.nodes.length == 0) {
      // TODO: Disable property inputs
    }
  });
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

function saveData(data, callback) {
  data.id = document.getElementById('node-id').value;
  data.label = document.getElementById('node-label').value;
  clearPopUp();
  callback(data);
}

Handlebars.registerHelper('isEmpty', function(arr, options) {
  if (arr.length == 0) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper('isDefined', function(obj, options) {
  if (obj) {
    return options.fn(this);
  }
  return options.inverse(this);
});
