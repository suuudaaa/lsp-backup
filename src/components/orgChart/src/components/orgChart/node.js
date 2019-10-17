const isLeaf = (data, prop) => {
  // 判断是否叶子节点
  return !(Array.isArray(data[prop]) && data[prop].length > 0);
};

export const renderNode = (h, data, context) => {
  // 创建 node 节点
  const { props } = context,
    cls = ["org-chart-node"],
    childNodes = [],
    children = data[props.props.children];

  if (isLeaf(data, props.props.children)) {
    cls.push("is-leaf");
  } else if (props.collapsable && !data[props.props.expand]) {
    cls.push("collapsed");
  }

  childNodes.push(renderLabel(h, data, context));

  if (!props.collapsable || data[props.props.expand]) {
    childNodes.push(renderChildren(h, children, context));
  }

  return h(
    "div",
    {
      domProps: {
        className: cls.join(" ")
      }
    },
    childNodes
  );
};

export const renderBtn = (h, data, { props, listeners }) => {
  // 创建展开折叠按钮
  const expandHandler = listeners["on-expand"];
  let cls = ["org-chart-node-btn"];

  if (data[props.props.expand]) {
    cls.push("expanded");
  }

  return h("span", {
    domProps: {
      className: cls.join(" ")
    },
    on: {
      click: e => expandHandler && expandHandler(e, data)
    }
  });
};

export const renderLabel = (h, data, context) => {
  // 创建 label 节点
  const { props, listeners } = context,
    label = data[props.props.label],
    renderContent = props.renderContent,
    clickHandler = listeners["on-node-click"],
    clickHover = listeners["on-hover-click"],
    childNodes = [];

  let editBtn = new Array();
  if (data.edit) {
    editBtn = [
      h("div", {
        domProps: {
          className:
            "icon iconfont icongongsiguanli-bianji org-chart-hover-icon"
        }
      }),
      h(
        "span",
        {
          domProps: {
            className: "org-chart-hover-text"
          }
        },
        "编辑"
      )
    ];
  } else {
    editBtn = [];
  }

  childNodes.push(
    h(
      "div",
      {
        domProps: {
          className: "org-chart-hover"
        },
        on: {
          click: e => clickHover && clickHover(e, data)
        }
      },
      editBtn
    )
  );
  if (typeof renderContent === "function") {
    let vnode = renderContent(h, data);

    vnode && childNodes.push(vnode);
  } else {
    childNodes.push(label);
  }

  if (props.collapsable && !isLeaf(data, props.props.children)) {
    childNodes.push(renderBtn(h, data, context));
  }

  const cls = ["org-chart-node-label-inner"];

  if (data.parent) cls.push("is-parent");

  let { labelWidth, labelClassName, selectedClassName, selectedKey } = props;

  if (typeof labelWidth === "number") {
    labelWidth += "px";
  }

  if (typeof labelClassName === "function") {
    labelClassName = labelClassName(data);
  }

  labelClassName && cls.push(labelClassName);

  // add selected class and key from props
  if (typeof selectedClassName === "function") {
    selectedClassName = selectedClassName(data);
  }

  selectedClassName &&
    selectedKey &&
    data[selectedKey] &&
    cls.push(selectedClassName);

  return h(
    "div",
    {
      domProps: {
        className: "org-chart-node-label"
      }
    },
    [
      h(
        "div",
        {
          domProps: {
            className: cls.join(" ")
          },
          style: { width: labelWidth },
          on: {
            click: e => clickHandler && clickHandler(e, data),
            mouseenter: e => {
              e.srcElement.className += " is-hover";
            },
            mouseleave: e => {
              e.srcElement.className = cls.join(" ");
            }
          }
        },
        childNodes
      )
    ]
  );
};

export const renderChildren = (h, list, context) => {
  // 创建 node 子节点
  if (Array.isArray(list) && list.length) {
    const children = list.map(item => {
      return renderNode(h, item, context);
    });

    return h(
      "div",
      {
        domProps: {
          className: "org-chart-node-children"
        }
      },
      children
    );
  }
  return "";
};

export const render = (h, context) => {
  const { props } = context;
  return renderNode(h, props.data, context);
};

export default render;
