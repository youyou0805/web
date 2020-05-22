$(function () {
    //------------------------引用js文件-------------------------------
    function include(path) {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.src = path;
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(a);
    }
    include("bootstrap.min.js");
    
    //----------------------分页功能------------------------------------
    //第一页
    $("#firstPage").click(function () {
        var max = 14;//max为一页最多显示多少行数据
        $("#mainTable tr").css("display", "table-row");
        var totalPage = Math.ceil(($("#mainTable tr").length - 1) / max);//Math.ceil(5/2)=3 向上取整
        $("#curPage").html("1");
        $("#totalPage").html("/" + totalPage);
        $("#mainTable tr:gt(" + max + ")").css("display", "none");
    })

    //最后一页
    $("#lastPage").click(function () {
        var max = 14;//max为一页最多显示多少行数据
        $("#mainTable tr").css("display", "table-row");
        var totalRecord = $("#mainTable tr").length;
        var totalPage = Math.ceil((totalRecord - 1) / max);
        $("#curPage").html(totalPage);
        $("#mainTable tr:lt(" + ((totalPage - 1) * max + 1) + ")").css("display", "none");
        $("#header").css("display", "table-row");
    })

    //上一页
    $("#prePage").click(function () {
        var max = 14;//max为一页最多显示多少行数据
        var cur = parseInt($("#curPage").html());
        if (cur != 1) {
            $("#mainTable tr").css("display", "table-row");
            $("#curPage").html(cur - 1);
            $("#mainTable tr:lt(" + ((cur - 2) * max + 1) + ")").css("display", "none");
            $("#mainTable tr:gt(" + ((cur - 1) * max) + ")").css("display", "none");
            $("#header").css("display", "table-row");
        }
    })

    //下一页
    $("#nextPage").click(function () {
        var max = 14;//max为一页最多显示多少行数据
        var cur = parseInt($("#curPage").html());
        var totalPage = Math.ceil(($("#mainTable tr").length - 1) / max);
        if (cur != totalPage) {
            $("#mainTable tr").css("display", "table-row");
            $("#curPage").html(cur + 1);
            $("#mainTable tr:lt(" + (cur * max + 1) + ")").css("display", "none");
            $("#mainTable tr:gt(" + ((cur + 1) * max) + ")").css("display", "none");
            $("#header").css("display", "table-row");
        }
    })

    function MultiPage() {
        var max = 14;//max为一页最多显示多少行数据
        if ($("#mainTable tr:visible").length - 1 > max) {
            $("#divPage").css("display", "block");//显示分页按钮组
            $("#firstPage").trigger("click");
        }
        else
            $("#divPage").css("display", "none");//隐藏分页按钮组
    }

    $("#btnGo").click(function () {
        var max = 15;//max为一页最多显示多少行数据
        var searchPage = parseInt($("#searchPage").val().trim());
        var totalPage = Math.ceil(($("#mainTable tr").length - 1) / max);//Math.ceil(5/2)=3 向上取整
        if (searchPage >= 1 && searchPage <= totalPage) {
            $("#mainTable tr").css("display", "table-row");
            $("#curPage").html(searchPage);
            $("#mainTable tr:lt(" + ((searchPage - 1) * max + 1) + ")").css("display", "none");
            $("#mainTable tr:gt(" + (searchPage * max) + ")").css("display", "none");
            $("#header").css("display", "table-row");
            if (searchPage == 1)
                $("#firstPage").trigger("click");
            if (searchPage == totalPage)
                $("#lastPage").trigger("click");
        }
        else
            alert("输入页码不合理!");
    })

    $("#searchPage").focus(function () {
        $(this).val("");
    })

    //------------------------点击侧边栏导航--------------------------
    $("p").click(function () {
        var user =(window.location.search).substring(1);//当前用户id
        var id = $(this).attr("id");//获取当前点击对象的id
        var r1,r2,r3;
        r1 = "<input id='r1' type='radio' name='radio' />";
        r2 = "<input id='r2' type='radio' name='radio' />";
        r3 = "<input id='r3' type='radio' name='radio' />";
        var head;
        if (id == "M") {
            $("#title").html("管理员信息");
            $("#l1").html(r1+"管理员工号");
            $("#l2").html(r2+"管理员姓名");
            $("#l3").css("display", "none");
            sql = "select 工号,姓名,手机号 from 管理员表";
            head = ["管理员工号", "管理员姓名", "手机号", "操作"];
            JsonFillTable("#mainTable", head, sql);
            $("#mainTable tr:gt(0)").append("<td><i class='fa fa-pencil fa-lg'></i>  <i class='fa fa-trash-o fa-lg'></i></<td>");
        }
        if (id == "T") {
            $("#title").html("教师信息");
            $("#l1").html(r1+"教师工号");
            $("#l2").html(r2+"教师姓名");
            $("#l3").css("display", "none");
            sql = "select 工号,姓名,手机号 from 教师表";
            head = ["教师工号", "教师姓名", "手机号", "操作"];
            JsonFillTable("#mainTable", head, sql);
            $("#mainTable tr:gt(0)").append("<td><i class='fa fa-pencil fa-lg'></i>  <i class='fa fa-trash-o fa-lg'></i></<td>");
        }
        if (id == "C") {
            $("#title").html("课程信息");
            $("#l1").html(r1+"课程号");
            $("#l2").html(r2+"课程名称");
            $("#l3").css("display", "none");
            sql = "select 课程号,课程名称,上机课时 from 课程表";
            head = ["课程号", "课程名称", "上机课时", "操作"];
            JsonFillTable("#mainTable", head, sql);
            $("#mainTable tr:gt(0)").append("<td><i class='fa fa-pencil fa-lg'></i>  <i class='fa fa-trash-o fa-lg'></i></<td>");
        }
        if (id == "R") {
            $("#title").html("机房管理");
            $("#l1").html(r1 + "教室号");
            $("#l2").html(r2 + "学院名称");
            $("#l3").css("display", "inline");
            sql = "select 教室号,学院名称,容量 from 机房基本情况表 as a inner join 学院表 as b on a.学院号=b.学院号";
            head = ["教室号", "学院名称", "容量", "禁止上机时段", "操作"];
            JsonFillTable("#mainTable", head, sql);
            $("#mainTable tr:gt(0)").append("<td><button class='btn btn-default btn-xs ck'><span class='glyphicon glyphicon-zoom-in'></span> 查看</button></td><td><i class='fa fa-pencil fa-lg'></i>  <i class='fa fa-trash-o fa-lg'></i></<td>");        }
        if (id == "S") {
            $("#mainTable").css("display", "block");
            $("#weekTable").css("display", "none");
            $("#title").html("学生基本信息");
            $("#l1").css("display", "inline");
            $("#l2").css("display", "inline");
            $("#s2").css("display", "none");
            $("#infoDiv").css("display", "none");
            $(".btnGroup").css("display", "block");//显示新增导出保存功能按钮组
            sql = "select 学号,姓名,学院名称,substring(学号,1,2)as 年级,专业名称," +
                    "substring(学号,7,1)as 班级 from (select 学号,姓名,专业号,专业名称 from 学生表 " +
                     "inner join 专业表 on substring(学号,3,4)=专业表.专业号 where substring(学号,1,6) " +
                    "in(select 年级专业号 from 授课表 where 教师工号='" + user + "')) as a inner join 学院表 " +
                     "on substring(专业号,1,2)=学院表.学院号";
            head = ["学号", "姓名", "学院", "年级","专业","班级", "操作"];
            JsonFillTable("#mainTable", head, sql);
            $("#mainTable tr:gt(0)").append("<td><i class='fa fa-pencil fa-lg'></i>  <i class='fa fa-trash-o fa-lg'></i></<td>");
            $("#weekTable").html("");
        }
        if (id == "A") {
            $("#mainTable").css("display", "none");
            $("#weekTable").css("display", "table");
            $("#title").html("上机安排");
            $("#l1,#l2").css("display", "none");
            $("#s2").css("display", "inline");
            $("#infoDiv").css("display", "block");
            $(".btnGroup").css("display", "none");//隐藏新增导出保存功能按钮组
            FillSelect("#s1", GetJson("select distinct(授课表.年级专业号),专业名称 from 授课表 inner join 专业表 on substring(授课表.年级专业号,3,4)=专业表.专业号 where 教师工号=(select 教师工号 from 教师表 where 工号='" + user + "')"));
            var no = $("#s1").val();//所选年级专业号
            var sql = "select a.课程号,课程名称 from 授课表 as a inner join 课程表 as b on a.课程号=b.课程号 where 年级专业号='" + no + "'";
            FillSelect("#s2", GetJson(sql));
            InitTeacherTable("#weekTable");//初始化课程表
            InitInfo();//初始化上机课时以及当前周信息
        }
        if (id == "X") {//管理员学期初始化
            $("#initial").fadeIn();
        }
        if (id == "P") {
            $("#myInfo").css("display", "block");
            $("#pwd2").val(""); $("#pwd1").val("");
            var page = window.location.pathname;//获取当前所处页面
            if (page == "/Manager.html")
                sql = "select 手机号 from 管理员表 where 工号 =" + user;
            if (page == "/Teacher.html")
                sql = "select 手机号 from 教师表 where 工号 =" + user;
            var json = GetJson(sql);
            $("#phone").val(json[0].info[0]);
        }
        if (id == "modify") {
            var p1 = $("#pwd1").val(), p2 = $("#pwd2").val(), p3 = $("#phone").val();
            if (p1 == "" || p2 == "" || p3 == "")
                alert("不能有空值");
            else
            {
                if (p1 != p2) {
                    alert("两次输入的密码不一致！请重新输入！");
                    $("#pwd2").val("");
                }
                else {
                    var page = window.location.pathname;//获取当前所处页面
                    if (page == "/Manager.html")
                        sql = "update 管理员表 set 密码='" + p1 + "', 手机号='" + p3 + "' where 工号=" + user;
                    if (page == "/Teacher.html")
                        sql = "update 教师表 set 密码='" + p1 + "', 手机号='" + p3 + "' where 工号=" + user;
                    if (page == "/Student.html")
                        sql = "update 学生表 set 密码=" + p1 + " where 学号=" + user;
                    var result = NonQuery(sql);
                    if (result == "true")
                        alert("操作成功!");
                    else
                        alert("操作失败!");
                }
            }
        }
        if (id != "P" && id != "modify") {
            MultiPage();//表格分页
        }
    })//p.click
    if (window.location.pathname == "/Manager.html")//当前所处页面
        $("#R").trigger("click");//首次进入页面时触发R的点击事件
    if (window.location.pathname == "/Teacher.html")
        $("#A").trigger("click");  

    //-----------------------管理员初始化学期-------------------------
    $("#iniOK").click(function () {
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var term;
        if (month > 2 && month < 9)
            term = '1';
        else if (month == 1 || month == 2) {
            term = '2';
            year = year - 1;
        }
        else
            term = '2';
        var termno = year.toString().substring(2, 4) + term;//学期号
        var json = GetJson("select 第一周 from 学期表 where 学期号='" + termno + "'");
        var sql = "";
        if (json == "") {//新学期
            $("#year").html(year);
            $("#term").html(term);
            if ($("#datePick").val() == "")
                alert("你还未选择日期");
            else
                sql = "insert into 学期表(学期号,第一周) values('" + termno + "','" + $("#datePick").val() + "')";
        }
        else {//修改第一周
            if ($("#datePick").val() == "")
                alert("你还未选择日期");
            else 
                sql = "update 学期表 set 第一周='" + $("#datePick").val() + "' where 学期号='" + termno + "'";
        }
        if (sql) {
            var result = NonQuery(sql);
            if (result=="true")
                alert("操作成功");
            else
                alert("操作失败");
        }
    })

    //-----------------------表格数据增删查改--------------------------
    //保存修改
    $("#save").click(function () {
        if ($("#mainTable").find("input").length == 0) {
            alert("未修改任何项");
            return false;
        }
        var flag = true;//用于判断表格信息是否填写完整
        $("#mainTable").find("input").each(function () {
            if ($(this).val() == "" && $(this).attr("placeholder") == null) {
                flag = false;
                alert("表格信息未填写完整");
            }
            if (flag == false)
                return false;
        })
        if (flag) {
            var sql = "";
            var page = $("#title").html().substring(0, 2);
            $("#mainTable tbody tr:visible").each(function () {
                var input = $(this).find("input");
                if ($(input).length != 0) {
                    if ($(input).eq(0).attr("placeholder") != null) {//此行为编辑行
                        var head;
                        if (page == "管理") {
                            sql += "update 管理员表 set ";
                            head = ["姓名", "手机号","工号"];//最后一个为主键
                        }
                        if (page == "教师") {
                            sql += "update 教师表 set ";
                            head = ["姓名", "手机号","工号"];
                        }
                        if (page == "课程") {
                            sql += "update 课程表 set ";
                            head = ["课程名称", "上机课时","课程号"];
                        }
                        if (page == "机房") {
                            sql += "update 机房基本情况表 set ";
                            head = ["容量","教室号"];
                        }
                        if (page == "学生") {
                            sql += "update 学生表 set ";
                            head = ["姓名","学号"];
                        }
                        var i = 0;
                        $(input).each(function () {
                            sql += head[i++] + "='";
                            if ($(this).val() == "")
                                sql += $(this).attr("placeholder");
                            else
                                sql += $(this).val();
                            sql += "'";
                            if ($(this).attr("placeholder") != $(input).last().attr("placeholder")) 
                                sql += ',';
                        })
                        if (page == "机房")
                            sql += ",学院号='" + $(this).find("select option:selected").val() + "'";
                        sql += " where " + head[i] + "='" + $(this).find("td").eq(1).html() + "'";
                    }
                    else {//此行为新增行
                        if (page == "管理")
                            sql += " insert into 管理员表(工号,姓名,手机号) values(";
                        if (page == "教师")
                            sql += " insert into 教师表(工号,姓名,手机号) values(";
                        if (page == "课程")
                            sql += " insert into 课程表(课程号,课程名称,上机课时) values(";
                        if (page == "机房")
                            sql += " insert into 机房基本情况表(教室号,容量,学院号) values(";
                        if (page == "学生") {
                            sql += " insert into 学生表(姓名,学号) values('" + $(this).find("td").eq(2).val() + "','";
                            var xh = $(this).find("input").eq(1).html() + $(this).find("select").eq(2).val() + $(this).find("input").eq(3).html() + "01";
                            sql += "'";
                        }
                        if (page != "学生") {
                            $(input).each(function () {
                                sql += "'" + $(this).val() + "'";
                                if ($(this).val() != $(input).last().val())
                                    sql += ',';
                            })
                        }
                        if (page == "机房")
                            sql += ",'" + $(this).find("select option:selected").val() + "'";
                        sql += ')';
                    }                    
                }
            })
            var qr = confirm("确认修改?");
            if (qr) {
                var result = NonQuery(sql);
                if (result) {
                    alert("保存成功");
                    $("#mainTable").on("click", "tr", trClick);//绑定tr点击事件           
                    if (page == "管理")
                        $("#M").trigger("click");
                    if (page == "教师")
                        $("#T").trigger("click");
                    if (page == "课程")
                        $("#C").trigger("click");
                    if (page == "机房")
                        $("#R").trigger("click");
                }
            }
        }
    })

    //添加新项
    $("#add").click(function () {
        var page = $("#title").html().substring(0, 2);
        var gh_input = "<td><input type='text' class='gh form-control input-sm tooltip-show' data-toggle='tooltip' title='" + "5位数字''/></td>";//工号
        var kch_input = "<td><input type='text' class='kch form-control input-sm tooltip-show' data-toggle='tooltip' title='" + "4位数字''/></td>";//课程号
        var ks_input = "<td><input type='text' class='ks form-control input-sm tooltip-show' data-toggle='tooltip' title='" + "100以内的整数''/></td>";//上机课时
        var jsh_input = "<td><input type='text' class='jsh form-control input-sm tooltip-show' data-toggle='tooltip' title='" + "3位数字''/></td>";//教室号
        var rl_input = "<td><input type='text' class='rl form-control input-sm tooltip-show' data-toggle='tooltip' title='" + "255以内的整数''/></td>";//容量
        var sj_input = "<td><input type='text' class='sj form-control input-sm tooltip-show' data-toggle='tooltip' title='" + "不是有效的手机号''/></td>";//手机号
        var input = "<td><input type='text' class='form-control input-sm'/></td>";
        var select = "<td><select class='form-control input-sm'></select></td>";
        var check = "<td><i class='fa fa-square-o fa-lg'></i></td>";
        var cz = "<td><i class='fa fa-pencil fa-lg'></i>  <i class='fa fa-trash-o fa-lg'></i></<td>";
        if (page == "管理")
            $("#mainTable tbody tr").eq(0).after("<tr>" + check + gh_input + input + sj_input + cz + "</tr>");
        if (page == "教师")
            $("#mainTable tbody tr").eq(0).after("<tr>" + check + gh_input + input + sj_input + cz + "</tr>");
        if (page == "课程")
            $("#mainTable tbody tr").eq(0).after("<tr>" + check + kch_input + input + ks_input + cz + "</tr>");
        if (page == "机房") {
            $("#mainTable tbody tr").eq(0).after("<tr>" + check + jsh_input + select + rl_input + "<td><button class='btn btn-default btn-xs ck'><span class='glyphicon glyphicon-zoom-in'></span> 查看</button></td>" + cz);
            FillSelect($("#mainTable tbody tr").eq(1).find("td").eq(2).find("select"), GetJson("select * from 学院表 order by 学院名称"));
        }
        if (page == "学生") {
            $("#mainTable tbody tr").eq(0).after("<tr>" + check + "<td></td>" + input + select + input + select + input + cz + "</tr>");
            FillSelect($("#mainTable tbody tr").eq(1).find("td").eq(3).find("select"), GetJson("select * from 学院表 order by 学院名称"));
            FillSelect($("#mainTable tbody tr").eq(1).find("td").eq(5).find("select"),
                GetJson("select * from 专业表 where substring(专业号,1,2)='" + $("#mainTable tbody tr").eq(1).find("select").eq(0).val() + "' order by 专业名称"));
        }
        $("#mainTable").off("click", "tr");//移除tr点击事件
        //隐藏全选列
        $("#mainTable tr").eq(0).find("th:first").hide();
        $("#mainTable tr").find("td:first").hide();
        $("#mainTable tr").eq(2).find("td").eq(4).children().hide();//隐藏查看上机时段按钮
        $("#mainTable tbody tr").eq(1).find("i").hide();//隐藏操作按钮
    })

    //编辑修改
    $("#mainTable").on("click", ".fa-pencil", function (event) {
        $("#mainTable").off("click", "tr");//移除tr点击事件
        //隐藏全选列
        $("#mainTable tr").eq(0).find("th:first").hide();
        $("#mainTable tr").find("td:first").hide();
        $(this).parent().find("i").hide();//隐藏操作按钮
        var tds = $(this).parent().siblings();//当前所在行的td集合
        var page = $("#title").html().substring(0, 2);//当前所在页面
        var Tip_input = "<td><input type='text' class='form-control input-sm tooltip-show' data-toggle='tooltip' title='";
        var ks_input = "<td><input type='text' class='ks form-control input-sm tooltip-show' data-toggle='tooltip' title='" + "100以内的整数''/></td>";//上机课时
        var rl_input = "<td><input type='text' class='rl form-control input-sm tooltip-show' data-toggle='tooltip' title='" + "255以内的整数''/></td>";//容量
        var sj_input = "<td><input type='text' class='sj form-control input-sm tooltip-show' data-toggle='tooltip' title='" + "不是有效的手机号''/></td>";//手机号
        var input = "<td><input type='text' class='form-control input-sm'/></td>";
        var tip = "";//保存当前td的值，用于设置input的placeholder
        if (page == "管理" || page == "教师") {
            tip += $(tds).eq(2).html() + "*";
            $(tds).eq(2).html(input);
            tip += $(tds).eq(3).html();
            $(tds).eq(3).html(sj_input);
        }
        if (page == "机房") {
            var cur = $(tds).eq(2).html();//当前学院名称
            $(tds).eq(2).html("<select class='form-control input-sm'></select>");//学院选择下拉框
            FillSelect($(tds).eq(2).find("select"), GetJson("select * from 学院表 order by 学院名称"));
            tip += $(tds).eq(3).html();
            $(tds).eq(3).html(rl_input);
            //设置选中项
            $(tds).eq(2).find("select option:contains(" + cur + ")").each(function () {
                if ($(this).text() == cur) {
                    $(this).attr('selected', true);
                    return false;
                }
                return true;
            })
        }
        if (page == "课程") {
            tip += $(tds).eq(2).html() + "*";
            $(tds).eq(2).html(input);
            tip += $(tds).eq(3).html();
            $(tds).eq(3).html(ks_input);
        }
        if (page == "学生") {
            tip += $(tds).eq(2).html();
            $(tds).eq(2).html(input);
        }
        //设置输入框placeholder
        tip = tip.split('*');
        var i = 0;
        $(tds).find("input").each(function () {
            $(this).attr("placeholder", tip[i++]);
        })
        event.stopPropagation();
    })

    //退出编辑

    //删除所选项
    $("#mainTable").on("click", ".fa-trash-o", function (event) {
        var r = confirm("确定删除所选项？");
        if (r == true) {
            var ids = "(";//要删除的id集合
            var flag = true;//为true时表示用户未选中任何一项,此时只删除当前项
            $("#mainTable tbody tr:visible").each(function () {
                if ($(this).find("i").eq(0).hasClass("fa-check-square-o") == true) {//当前为选中状态
                    ids += "'" + $(this).find("td").eq(1).html() + "',";
                    flag = false;
                }
            })
            if (flag)
                ids += "'" + $(this).parent().siblings().eq(1).html() + "',";
            ids = ids.substring(0, ids.length - 1);
            ids += ")";
            var page = $("#title").html().substring(0, 2);//当前所处页面
            var sql;
            if (page == "管理")
                sql = "delete from 管理员表 where 工号 in" + ids;
            if (page == "教师")
                sql = "delete from 教师表 where 工号 in" + ids;
            if (page == "课程")
                sql = "delete from 课程表 where 课程号 in" + ids;
            if (page == "机房")
                sql = "delete from 机房基本情况表 where 教室号 in" + ids;
            var result = NonQuery(sql);
            if (result == "true") {
                alert("操作成功!");
                if (page == "管理")
                    $("#M").trigger("click");
                if (page == "教师")
                    $("#T").trigger("click");
                if (page == "课程")
                    $("#C").trigger("click");
                if (page == "机房")
                    $("#R").trigger("click");
            }
            else
                alert("操作失败!");
        }
        event.stopPropagation();
    })

    //全选
    $("#mainTable").on("click", "#allCheck", function (event) {
        var flag = true;
        $("#mainTable tr:visible:gt(0)").find("td:first").children().each(function () {
            if ($(this).hasClass("fa-check-square-o") == false) {
                flag = false;
                $(this).not("#allCheck").removeClass("fa-square-o").addClass('fa-check-square-o');
            }
        })
        if (flag == true)//已全选
            $("#mainTable tr:visible:gt(0)").find("td:first").children().toggleClass("fa-check-square-o fa-square-o");
        event.stopPropagation();
    })

    //单选
    $("#mainTable").on("click", "tr", trClick)
    function trClick() {
        $(this).find("td:first").children().toggleClass("fa-check-square-o fa-square-o");
    }

    //表单验证
    $("#mainTable").on("blur", "input", function () {
        var reg=new RegExp;//正则表达式
        if ($(this).hasClass("gh"))
            reg = /^[0-9]{5}$/;//5位数字
        if ($(this).hasClass("kch"))
            reg = /^[0-9]{4}$/;//4位数字
        if ($(this).hasClass("ks"))
            reg = /^[1-9]{0,1}[0-9]{0,1}$/; //0-99之间的整数
        if ($(this).hasClass("jsh"))
            reg = /^[0-9]{3}$/;//3位数字
        if ($(this).hasClass("rl"))
            reg = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])$/;//0-255之间的整数
        if($(this).hasClass("sj"))
            reg=/^1[3|4|5|8][0-9]\d{4,8}$/;//手机号
        if (reg.test($(this).val().trim()) == false) {
            $(this).tooltip("show");
            $(this).val("");
        }
    })

    //表格内容动态搜索
    //c为动态匹配的列号
    $("#searchInput").keyup(function () {
        $("#divPage").css("display", "none");//隐藏分页按钮组
        var id = $('input:radio[name="radio"]:checked').attr("id");//获取搜索条件的id
        if (id == null) {
            alert("请先选择搜索条件");
            $("#searchInput").val("");
            return false;
        }
        var c = parseInt(id.substring(1));//对表格的c列数据进行动态搜索
        $("#mainTable tr:gt(0)").css("display", "none");//先将所有行隐藏
        var querystr = $("#searchInput").val().trim();
        $("#mainTable tr:gt(0)").each(function () { //遍历所有行
            if ($(this).children().eq(c).text().indexOf(querystr) >= 0)
                $(this).css("display", "table-row");
        })
    })

    //s1与s2下拉框联动选择专业课程
    $("#s1").change(function () {
        $("#s2 option[value!='']").remove();
        var no = $(this).children('option:selected').val();//所选年级专业号
        var sql = "select a.课程号,课程名称 from 授课表 as a inner join 课程表 as b on a.课程号=b.课程号 where 年级专业号='" + no + "'";
        FillSelect("#s2", GetJson(sql));
        InitInfo();
    })
    $("#s2").change(function () {
        InitInfo();
    })

    //初始化当前周,上机课时信息
    function InitInfo() {
        var user =(window.location.search).substring(1);//当前用户id
        var zno = $("#s1").val();//年级专业号
        var cno = $("#s2").val();//课程号
        var sql = "select dbo.CurWeek(),上机课时 from 课程表 where 课程号=(select 课程号 from 授课表 where 教师工号='" + user
            + "' and 课程号='" + cno + "' and 年级专业号='" + zno + "')";
        var json = GetJson(sql);
        $("#curWeek").html("当前是第" + json[0].info[0] + "周");
        $("#week").html(json[0].info[0]);
        $("#time").html("选中课程所需上机课时:" + json[0].info[1]);
    }

    //初始化课程表
    function InitTeacherTable(table) {
        var str = "<thead><tr><td></td><th>周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th>周六</th><th>周日</th></tr></thead>";
        for (var i = 1; i <= 5; i++) {
            str += "<tr><td>第" + i + "节课</td>";
            for (var j = 1; j <= 7; j++) 
                str += "<td class='td_hover' style='text-align:center'>查看</td>";
            str + "</tr>";
        }
        $(table).html(str);
    }

    //----------------------------教师上机安排----------------------------
    //查看空余机房
    $("#weekTable").on("click", "td", function () {
        $("#freeTime").fadeIn();
        var hang = $(this).parent().prevAll().length + 1;//获取点击单元格的行即第几节课
        var lie = $(this).prevAll().length;//获取点击单元格的列即周几
        $("#freeTime").find("b").html("周" + lie + "第" + hang + "节课空余机房时段");
        var zno = $("#s1").val();//年级专业号
        var sno = zno.substring(2, 4);//学院号
        var week = $("#week").html();//当前周
        var str = "<thead><tr><th>教室号</th><th>容量</th><th>空余周数</th></tr></thead>";
        var sql = "select 教室号,容量,dbo.BanTime(教室号) as 禁止上机时段 from 机房基本情况表 where 学院号='" + sno + "'";
        var json = GetJson(sql);
        str += "<tbody>";
        for (var i in json) {
            str += "<tr><td>" + json[i].info[0] + "</td><td>" + json[i].info[1] + '</td><td><div class="btn-group">';
            var ban = JSON.stringify(json[i].info[2]);
            ban = ban.substring(1, ban.length - 1);
            ban = ban.split('.');
            for (var w = week; w <= 25; w++) {
                var flag = true;//为真时表示当前周是空余的
                for (var t in ban)
                    if (ban[t].substring(2) == w && ban[t].substring(0, 1) == lie.toString() && ban[t].substring(1, 2) == hang.toString()) {
                        flag = false;
                        break;
                    }
                if(flag)
                    str += '<button class="btn btn-default zBtn">' + w + '</button>';
            }
            str += "</div></td></tr>";
        }
        str += "</tbody>";
        $("#freeTable").html(str);
    })

    //周数鼠标hover多选
    var press = false;
    $("#freeTable").on("mousedown", ".zBtn", function () {
        press = true;
        $(this).toggleClass("btn-success btn-default");
    })
    $("#freeTable").on("mouseover", ".zBtn", function () {
        if(press)
            $(this).toggleClass("btn-success btn-default");
    })
    $("#freeTable").on("mouseup", ".zBtn", function () {
        press = false;
    })
    //周数鼠标click单选
    $("#freeTable").on("click", ".zBtn", function () {
        if (press == false)
            $(this).toggleClass("btn-success btn-default");
    })

    //确认安排上机
    $("#arrange").click(function () {
        var user =(window.location.search).substring(1);//当前用户id
        var zno = $("#s1").val();//年级专业号
        var cno = $("#s2").val();//课程号
        var zd = $("#freeTime").find("b").html().substring(1, 2) + $("#freeTime").find("b").html().substring(3, 4);//周几第几节课
        var sql = "";
        $("#freeTable tbody").find("tr").each(function () {
            var time = "";
            $(this).find("button").each(function () {
                if ($(this).hasClass("btn-success"))
                    time += zd + $(this).html() + '.';
            })
            if (time != "") {
                var jsh = $(this).children().eq(0).html();//教室号
                sql += "insert into 机房上机时段表(教室号,教师工号,年级专业号,课程号,上机时段) values('"
                    + jsh + "','" + user + "','" + zno + "','" + cno + "','";
                time = time.substring(0, time.length - 1);
                sql += time + "') ";
            }
        })
        var result = NonQuery(sql);
        if (result)
            alert("安排成功");
        else
            alert("保存失败");
    })

    //-------------------------管理员查看上机时段------------------------------
    $("#mainTable").on("click", ".ck", function (event) {
        $("#timeCk").fadeIn();
        var no = $(this).parent().siblings().eq(1).html();
        $("#timeCk").find("b").html(no + "教室上机时段");//标题
        var json = GetJson("select dbo.CurWeek() from 机房基本情况表");//获取当前周
        var c = json[0].info[0]; //当前周
        var str = "";
        for (var i = 1; i <= 25; i++) //填充下拉框
            str += "<option " + "value=" + i + ">" + i + "</option>";
        $("#weekPick").html(str);
        $("#weekPick").val(c);//默认显示当前周
        InitTimeTable(c, $(this).parent().siblings().eq(1).html());
        event.stopPropagation();
    })

    //初始化上机时段表，c为第几周，no为教室号
    function InitTimeTable(c, no) {
        var json = GetJson("select 禁止上机时段 from 机房基本情况表 where 教室号='" + no + "'");
        console.log(json);
        var ban = JSON.stringify(json[0].info[0]);
        ban = ban.substring(1, ban.length - 1).split('.');
        var str = "";
        for (var i = 1; i <= 5; i++) {
            str += "<tr><td>第" + i + "节课</td>";
            for (var j = 1; j <= 7; j++) {//周几
                var flag = true;
                for (var t in ban) {
                    if (ban[t].substring(2) == c && ban[t].substring(0, 1) == j.toString() && ban[t].substring(1, 2) == i.toString()) {
                        flag = false;
                        str += "<td><i class='fa fa-times fa-lg' style='color:red'></i></td>";
                        break;
                    }
                }
                if (flag)
                    str += "<td><i class='fa fa-check fa-lg' style='color:green'></i></td>";
            }
            str += "</tr>";
        }
        $("#timeCk tbody").html(str);
    }

    //点击√×更改状态
    $("#timeCk").on("click", "td", function () {
        if ($(this).children().hasClass("fa-times") == true)
            $(this).children().css("color", "green");
        else
            $(this).children().css("color", "red");
        $(this).children().toggleClass("fa-times fa-check");
    })

    //当前周下拉框选择更改
    $("#weekPick").change(function () {
        InitTimeTable($(this).val(), $("#timeCk").find("b").html().substring(0, 3));
    })

    //确认修改
    $("#timeOK").click(function () {
        var str="";
        $("#timeCk").find("i").each(function () {
            if ($(this).hasClass("fa-times")) {
                var hang = $(this).parent().parent().prevAll().length + 1;//获取点击单元格的行
                var lie = $(this).parent().prevAll().length;//获取点击单元格的列
                str += lie.toString() + hang.toString() + $("#weekPick").val() + '.';
            }
        })
        str = str.substring(0, str.length - 1);
        var sql = "update 机房基本情况表 set 禁止上机时段='" + str + "' where 教室号='" + $("#timeCk").find("b").html().substring(0, 3) + "'";
        var result = NonQuery(sql);
        if (result)
            alert("保存成功!");
        else
            alert("保存失败");
    })

    //----------------------导出excel表格------------------------------
    //将table的某些列(cols:"1,2,3")导出为excel格式
    function exportToExcel(table, col) {
        $(table).tableExport({
            filename: 'table_%YY%-%MM%-%DD%-%hh%',
            format: 'xls',
            cols: col
        });
    }

    //导出按钮点击
    $("#export").click(function () {
        var flag = false;//标识有(flag=true)无(flag=false)主动选择行，若无的话，默认打印整张表
        if ($("#mainTable tbody").find("i").hasClass("fa-check-square-o"))
            flag = true;
        if (flag) {
            $("#mainTable tbody").find("tr").each(function () {
                if ($(this).find("i").eq(0).hasClass("fa-square-o"))
                    $(this).remove();
            })
        }
        var page = $("#title").html().substring(0, 2);
        var cols;
        if (page == "管理" || page == "教师" || page == "课程" || page == "机房")
            cols = "2,3,4";
        if (page == "学生")
            cols = "2,3,4,5,6,7";
        exportToExcel("#mainTable", cols);
        if (page == "管理")
            $("#M").trigger("click");
        if (page == "教师")
            $("#T").trigger("click");
        if (page == "课程")
            $("#C").trigger("click");
        if (page == "机房")
            $("#R").trigger("click");
    })

    //----------------------后台数据交互-------------------------------
    //非查询的ajax操作，即增删改数据
    function NonQuery(sql) {
        sql = encodeURI(sql);
        var result;
        $.ajax({
            url: "DealData.aspx",
            datatype: "text",
            data: { ask: "NonQuery", sql: sql },
            async: false,
            success: function (re) {
                result = re;
            }
        })
        return result;
    }

    //同时增删改多条数据
    //keys和data为二维数组
    //tablename为要操作的表名，keys为要删除的主键集合(第0行为主键列名）,keyno为列数
    //data为要新增的数据集合(第0行为数据在表中的列名）,datano为列数
    function MultiNoQuery(tablename, keys, data, keyno, datano) {
        var result;
        $.ajax({
            url: "DealData.aspx",
            datatype: "text",
            data: { ask: "MultiNoQuery", tablename: encodeURI(tablename), keys: encodeURI(keys), data: encodeURI(data), keyno: keyno, datano: datano },
            traditional: true,
            async: false,
            success: function (re) {
                result = re;
            }
        })
        return result;
    }

    //根据指定sql命令向前台获取数据以json格式传回后台
    function GetJson(sql) {
        sql = encodeURI(sql);
        var json;
        $.ajax({
            url: "DealData.aspx",
            //返回json字符串
            datatype: "text",
            async: false,//表示请求是否异步处理,默认是 true
            data: { ask: "table", sql: sql },
            success: function (jsonstr) {
                json = JSON.parse(jsonstr);
            }
        })
        return json;
    }

    //用json填充表格table，head为标题数组
    function JsonFillTable(table, head, sql) {
        var json = GetJson(sql);
        console.log(json);
        //动态拼接表格
        var str = "<thead><tr class='info' id='header'><th style='width:4%'><button id='allCheck' type='button' class='btn btn-default btn-xs'><span class='glyphicon glyphicon-ok'></span> 全选</button></th>";
        var i, j;
        for (i in head) { str += "<th>" + head[i] + "</th>"; }//标题栏
        str += "</tr></thead><tbody>";
        for (i in json) {//表格内容
            str += "<tr><td><i class='fa fa-square-o fa-lg'></i></td>";
            for (j in json[i].info)
                str += "<td>" + json[i].info[j] + "</td>";
            str += "</tr>";
        }
        str += "</tbody>";
        $(table).html(str);
    }

    //使用json填充下拉列表框s
    function FillSelect(s, json) {
        var str = "";
        for (var i in json) 
            str += "<option value=" + json[i].info[0] + ">" + json[i].info[1] + "</option>";
        $(s).html(str);
    }

    //---------------------------弹窗关闭按钮------------------------
    $(".close").click(function(){
        $(".modal").fadeOut();
    })

    //--------------------------------学生页面-------------------------
    var pppage = window.location.pathname;//获取当前所处页面
    if (pppage == "/Student.html") {
        var user =(window.location.search).substring(1);//当前用户id
        var sql = "select 学号,姓名,学院名称,substring(学号,1,2)as 年级,专业名称," +
        "substring(学号,7,1)as 班级,dbo.CurWeek() from (select 学号,姓名,专业号,专业名称 from 学生表 " +
        "inner join 专业表 on substring(学号,3,4)=专业表.专业号 where 学号='" + user + "') as a inner join 学院表 " +
        "on substring(专业号,1,2)=学院表.学院号";
        var json = GetJson(sql);
        $("#no").html(json[0].info[0]);
        $("#name").html(json[0].info[1]);
        $("#xy").html(json[0].info[2]);
        $("#year").html(json[0].info[3]);
        $("#zy").html(json[0].info[4]);
        $("#ban").html(json[0].info[5]);
        InitClassTable();
        FillClassTable(json[0].info[6]);
        var str = "";
        for (var i = 1; i <= 25; i++) //填充下拉框
            str += "<option " + "value=" + i + ">" + i + "</option>";
        $("#week").html(str);
        $("#week").val(json[0].info[6]);//默认显示当前周
    }

    //初始化课程表
    function InitClassTable() {
        var str = "";
        for (var i = 1; i <= 5; i++) {
            str += "<tr><td>第" + i + "节课</td>";
            for (var j = 1; j <= 7; j++) //周几
                str += "<td></td>";
            str += "</tr>";
        }
        $("#classTable tbody").html(str);
    }

    //填充课程表，c为第几周
    function FillClassTable(c) {
        $("#classTable").find("div").remove();//先清空
        var sql = "select 上机时段,教室号,姓名,课程名称 from(select 上机时段,教室号,姓名,课程号 from 机房上机时段表 " +
            "as a inner join 教师表 as b on a.教师工号=b.工号 where 年级专业号='" + $("#no").html().substring(0, 6) +
            "')as a inner join 课程表 as b on a.课程号=b.课程号";
        var json = GetJson(sql);
        for (var i in json) {
            var time = JSON.stringify(json[i].info[0]);
            time = time.substring(1, time.length - 1).split('.');
            for (var t in time) {
                if (time[t].substring(2) == c) {
                    var cont = "<div>" + json[i].info[3] + "(" + json[i].info[2] + ")" + json[i].info[1] + "</div>";
                    $("#classTable tr").eq(time[t].substring(1, 2)).find("td").eq(time[t].substring(0, 1)).html(cont);
                    break;
                }
            }
        }
    }

    $("#week").change(function () {
        FillClassTable($(this).val());
    })
})