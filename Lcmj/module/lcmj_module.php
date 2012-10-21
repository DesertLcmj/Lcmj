<?php
/*
 *@Lcmj
 *
 *@Made by Desert
 *
 *
 *@Build:2012-10-20
 *@Final:2012-10-21
 *
 *
 *@The Main Controller of Lcmj
 */

class Lcmj_Module
{
    //Define method,label && article id
    public $mid;
    public $lid;
    public $aid;


    //Get method,label && article id
    /*
    function __construct()
    {
        if (!empty($_GET[mid]))
        {
            $this -> mid = $_GET[mid];
        }
        if (!empty($_GET[mid]))
        {
            $this -> lid = $_GET[lid];
        }
        if (!empty($_GET[aid]))
        {
            $this -> aid = $_GET[aid];
        }
    }
     */


    //Output view files
    public function output_view()
    {
		//requset site_info files
		include './module/config/site_info.php';
		//request view files
		include './view/head.php';
		include './view/nav.php';
		include './view/index_content.php';
		include './view/footer.php';



		//echo view files
		echo $head.$nav.$index_content.$footer;
        
    }








}


/* The end of lcmj_module.php */
/* Location:./Lcmj/module/lcmj_module.php */
?>
