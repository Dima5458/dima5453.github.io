<?php
/**
 * CodeIgniter
 *
 * An open source application development framework for PHP
 *
 * This content is released under the MIT License (MIT)
 *
 * Copyright (c) 2014 - 2015, British Columbia Institute of Technology
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @package	CodeIgniter
 * @author	EllisLab Dev Team
 * @copyright	Copyright (c) 2008 - 2014, EllisLab, Inc. (http://ellislab.com/)
 * @copyright	Copyright (c) 2014 - 2015, British Columbia Institute of Technology (http://bcit.ca/)
 * @license	http://opensource.org/licenses/MIT	MIT License
 * @link	http://codeigniter.com
 * @since	Version 1.0.0
 * @filesource
 */

/*
 *---------------------------------------------------------------
 * APPLICATION ENVIRONMENT
 *---------------------------------------------------------------
 *
 * You can load different configurations depending on your
 * current environment. Setting the environment also influences
 * things like logging and error reporting.
 *
 * This can be set to anything, but default usage is:
 *
 *     development
 *     testing
 *     production
 *
 * NOTE: If you change these, also change the error_reporting() code below
 */
	define('ENVIRONMENT', isset($_SERVER['CI_ENV']) ? $_SERVER['CI_ENV'] : 'development');

/*
 *---------------------------------------------------------------
 * ERROR REPORTING
 *---------------------------------------------------------------
 *
 * Different environments will require different levels of error reporting.
 * By default development will show errors but testing and live will hide them.
 */
switch (ENVIRONMENT)
{
	case 'development':
		error_reporting(-1);
		ini_set('display_errors', 1);
	break;

	case 'testing':
	case 'production':
		ini_set('display_errors', 0);
		if (version_compare(PHP_VERSION, '5.3', '>='))
		{
			error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_STRICT & ~E_USER_NOTICE & ~E_USER_DEPRECATED);
		}
		else
		{
			error_reporting(E_ALL & ~E_NOTICE & ~E_STRICT & ~E_USER_NOTICE);
		}
	break;

	default:
		header('HTTP/1.1 503 Service Unavailable.', TRUE, 503);
		echo 'The application environment is not set correctly.';
		exit(1); // EXIT_ERROR
}

/*
 *---------------------------------------------------------------
 * SYSTEM FOLDER NAME
 *---------------------------------------------------------------
 *
 * This variable must contain the name of your "system" folder.
 * Include the path if the folder is not in the same directory
 * as this file.
 */
	$system_path = 'system';

/*
 *---------------------------------------------------------------
 * APPLICATION FOLDER NAME
 *---------------------------------------------------------------
 *
 * If you want this front controller to use a different "application"
 * folder than the default one you can set its name here. The folder
 * can also be renamed or relocated anywhere on your server. If
 * you do, use a full server path. For more info please see the user guide:
 * http://codeigniter.com/user_guide/general/managing_apps.html
 *
 * NO TRAILING SLASH!
 */
	$application_folder = 'application';

/*
 *---------------------------------------------------------------
 * VIEW FOLDER NAME
 *---------------------------------------------------------------
 *
 * If you want to move the view folder out of the application
 * folder set the path to the folder here. The folder can be renamed
 * and relocated anywhere on your server. If blank, it will default
 * to the standard location inside your application folder. If you
 * do move this, use the full server path to this folder.
 *
 * NO TRAILING SLASH!
 */
	$view_folder = '';


/*
 * --------------------------------------------------------------------
 * DEFAULT CONTROLLER
 * --------------------------------------------------------------------
 *
 * Normally you will set your default controller in the routes.php file.
 * You can, however, force a custom routing by hard-coding a
 * specific controller class/function here. For most applications, you
 * WILL NOT set your routing here, but it's an option for those
 * special instances where you might want to override the standard
 * routing in a specific front controller that shares a common CI installation.
 *
 * IMPORTANT: If you set the routing here, NO OTHER controller will be
 * callable. In essence, this preference limits your application to ONE
 * specific controller. Leave the function name blank if you need
 * to call functions dynamically via the URI.
 *
 * Un-comment the $routing array below to use this feature
 */
	// The directory name, relative to the "controllers" folder.  Leave blank
	// if your controller is not in a sub-folder within the "controllers" folder
	// $routing['directory'] = '';

	// The controller class file name.  Example:  mycontroller
	// $routing['controller'] = '';

	// The controller function you wish to be called.
	// $routing['function']	= '';


/*
 * -------------------------------------------------------------------
 *  CUSTOM CONFIG VALUES
 * -------------------------------------------------------------------
 *
 * The $assign_to_config array below will be passed dynamically to the
 * config class when initialized. This allows you to set custom config
 * items or override any default config values found in the config.php file.
 * This can be handy as it permits you to share one application between
 * multiple front controller files, with each file containing different
 * config values.
 *
 * Un-comment the $assign_to_config array below to use this feature
 */
	// $assign_to_config['name_of_config_item'] = 'value of config item';



// --------------------------------------------------------------------
// END OF USER CONFIGURABLE SETTINGS.  DO NOT EDIT BELOW THIS LINE
// --------------------------------------------------------------------

/*
 * ---------------------------------------------------------------
 *  Resolve the system path for increased reliability
 * ---------------------------------------------------------------
 */

	// Set the current directory correctly for CLI requests
	if (defined('STDIN'))
	{
		chdir(dirname(__FILE__));
	}

	if (($_temp = realpath($system_path)) !== FALSE)
	{
		$system_path = $_temp.'/';
	}
	else
	{
		// Ensure there's a trailing slash
		$system_path = rtrim($system_path, '/').'/';
	}

	// Is the system path correct?
	if ( ! is_dir($system_path))
	{
		header('HTTP/1.1 503 Service Unavailable.', TRUE, 503);
		echo 'Your system folder path does not appear to be set correctly. Please open the following file and correct this: '.pathinfo(__FILE__, PATHINFO_BASENAME);
		exit(3); // EXIT_CONFIG
	}

/*
 * -------------------------------------------------------------------
 *  Now that we know the path, set the main path constants
 * -------------------------------------------------------------------
 */
	// The name of THIS file
	define('SELF', pathinfo(__FILE__, PATHINFO_BASENAME));

	// Path to the system folder
	define('BASEPATH', str_replace('\\', '/', $system_path));

	// Path to the front controller (this file)
	define('FCPATH', dirname(__FILE__).'/');

	// Name of the "system folder"
	define('SYSDIR', trim(strrchr(trim(BASEPATH, '/'), '/'), '/'));

	// The path to the "application" folder
	if (is_dir($application_folder))
	{
		if (($_temp = realpath($application_folder)) !== FALSE)
		{
			$application_folder = $_temp;
		}

		define('APPPATH', $application_folder.DIRECTORY_SEPARATOR);
	}
	else
	{
		if ( ! is_dir(BASEPATH.$application_folder.DIRECTORY_SEPARATOR))
		{
			header('HTTP/1.1 503 Service Unavailable.', TRUE, 503);
			echo 'Your application folder path does not appear to be set correctly. Please open the following file and correct this: '.SELF;
			exit(3); // EXIT_CONFIG
		}

		define('APPPATH', BASEPATH.$application_folder.DIRECTORY_SEPARATOR);
	}

	// The path to the "views" folder
	if ( ! is_dir($view_folder))
	{
		if ( ! empty($view_folder) && is_dir(APPPATH.$view_folder.DIRECTORY_SEPARATOR))
		{
			$view_folder = APPPATH.$view_folder;
		}
		elseif ( ! is_dir(APPPATH.'views'.DIRECTORY_SEPARATOR))
		{
			header('HTTP/1.1 503 Service Unavailable.', TRUE, 503);
			echo 'Your view folder path does not appear to be set correctly. Please open the following file and correct this: '.SELF;
			exit(3); // EXIT_CONFIG
		}
		else
		{
			$view_folder = APPPATH.'views';
		}
	}

	if (($_temp = realpath($view_folder)) !== FALSE)
	{
		$view_folder = $_temp.DIRECTORY_SEPARATOR;
	}
	else
	{
		$view_folder = rtrim($view_folder, '/\\').DIRECTORY_SEPARATOR;
	}

	define('VIEWPATH', $view_folder);

/*
 * --------------------------------------------------------------------
 * LOAD THE BOOTSTRAP FILE
 * --------------------------------------------------------------------
 *
 * And away we go...
 */
require_once BASEPATH.'core/CodeIgniter.php';

<?php
/**
 * CodeIgniter
 *
 * An open source application development framework for PHP
 *
 * This content is released under the MIT License (MIT)
 *
 * Copyright (c) 2014 - 2015, British Columbia Institute of Technology
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @package	CodeIgniter
 * @author	EllisLab Dev Team
 * @copyright	Copyright (c) 2008 - 2014, EllisLab, Inc. (http://ellislab.com/)
 * @copyright	Copyright (c) 2014 - 2015, British Columbia Institute of Technology (http://bcit.ca/)
 * @license	http://opensource.org/licenses/MIT	MIT License
 * @link	http://codeigniter.com
 * @since	Version 3.0.0
 * @filesource
 */
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Interbase/Firebird Utility Class
 *
 * @category	Database
 * @author		EllisLab Dev Team
 * @link		http://codeigniter.com/user_guide/database/
 */
class CI_DB_ibase_utility extends CI_DB_utility {

	/**
	 * Export
	 *
	 * @param	string	$filename
	 * @return	mixed
	 */
	protected function _backup($filename)
	{
		if ($service = ibase_service_attach($this->db->hostname, $this->db->username, $this->db->password))
		{
			$res = ibase_backup($service, $this->db->database, $filename.'.fbk');

			// Close the service connection
			ibase_service_detach($service);
			return $res;
		}

		return FALSE;
	}

}
<?php
/**
 * CodeIgniter
 *
 * An open source application development framework for PHP
 *
 * This content is released under the MIT License (MIT)
 *
 * Copyright (c) 2014 - 2015, British Columbia Institute of Technology
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @package	CodeIgniter
 * @author	EllisLab Dev Team
 * @copyright	Copyright (c) 2008 - 2014, EllisLab, Inc. (http://ellislab.com/)
 * @copyright	Copyright (c) 2014 - 2015, British Columbia Institute of Technology (http://bcit.ca/)
 * @license	http://opensource.org/licenses/MIT	MIT License
 * @link	http://codeigniter.com
 * @since	Version 1.0.0
 * @filesource
 */
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Database Result Class
 *
 * This is the platform-independent result class.
 * This class will not be called directly. Rather, the adapter
 * class for the specific database will extend and instantiate it.
 *
 * @category	Database
 * @author		EllisLab Dev Team
 * @link		http://codeigniter.com/user_guide/database/
 */
class CI_DB_result {

	/**
	 * Connection ID
	 *
	 * @var	resource|object
	 */
	public $conn_id;

	/**
	 * Result ID
	 *
	 * @var	resource|object
	 */
	public $result_id;

	/**
	 * Result Array
	 *
	 * @var	array[]
	 */
	public $result_array			= array();

	/**
	 * Result Object
	 *
	 * @var	object[]
	 */
	public $result_object			= array();

	/**
	 * Custom Result Object
	 *
	 * @var	object[]
	 */
	public $custom_result_object		= array();

	/**
	 * Current Row index
	 *
	 * @var	int
	 */
	public $current_row			= 0;

	/**
	 * Number of rows
	 *
	 * @var	int
	 */
	public $num_rows;

	/**
	 * Row data
	 *
	 * @var	array
	 */
	public $row_data;

	// --------------------------------------------------------------------

	/**
	 * Constructor
	 *
	 * @param	object	$driver_object
	 * @return	void
	 */
	public function __construct(&$driver_object)
	{
		$this->conn_id = $driver_object->conn_id;
		$this->result_id = $driver_object->result_id;
	}

	// --------------------------------------------------------------------

	/**
	 * Number of rows in the result set
	 *
	 * @return	int
	 */
	public function num_rows()
	{
		if (is_int($this->num_rows))
		{
			return $this->num_rows;
		}
		elseif (count($this->result_array) > 0)
		{
			return $this->num_rows = count($this->result_array);
		}
		elseif (count($this->result_object) > 0)
		{
			return $this->num_rows = count($this->result_object);
		}

		return $this->num_rows = count($this->result_array());
	}

	// --------------------------------------------------------------------

	/**
	 * Query result. Acts as a wrapper function for the following functions.
	 *
	 * @param	string	$type	'object', 'array' or a custom class name
	 * @return	array
	 */
	public function result($type = 'object')
	{
		if ($type === 'array')
		{
			return $this->result_array();
		}
		elseif ($type === 'object')
		{
			return $this->result_object();
		}
		else
		{
			return $this->custom_result_object($type);
		}
	}

	// --------------------------------------------------------------------

	/**
	 * Custom query result.
	 *
	 * @param	string	$class_name
	 * @return	array
	 */
	public function custom_result_object($class_name)
	{
		if (isset($this->custom_result_object[$class_name]))
		{
			return $this->custom_result_object[$class_name];
		}
		elseif ( ! $this->result_id OR $this->num_rows === 0)
		{
			return array();
		}

		// Don't fetch the result set again if we already have it
		$_data = NULL;
		if (($c = count($this->result_array)) > 0)
		{
			$_data = 'result_array';
		}
		elseif (($c = count($this->result_object)) > 0)
		{
			$_data = 'result_object';
		}

		if ($_data !== NULL)
		{
			for ($i = 0; $i < $c; $i++)
			{
				$this->custom_result_object[$class_name][$i] = new $class_name();

				foreach ($this->{$_data}[$i] as $key => $value)
				{
					$this->custom_result_object[$class_name][$i]->$key = $value;
				}
			}

			return $this->custom_result_object[$class_name];
		}

		is_null($this->row_data) OR $this->data_seek(0);
		$this->custom_result_object[$class_name] = array();

		while ($row = $this->_fetch_object($class_name))
		{
			$this->custom_result_object[$class_name][] = $row;
		}

		return $this->custom_result_object[$class_name];
	}

	// --------------------------------------------------------------------

	/**
	 * Query result. "object" version.
	 *
	 * @return	array
	 */
	public function result_object()
	{
		if (count($this->result_object) > 0)
		{
			return $this->result_object;
		}

		// In the event that query caching is on, the result_id variable
		// will not be a valid resource so we'll simply return an empty
		// array.
		if ( ! $this->result_id OR $this->num_rows === 0)
		{
			return array();
		}

		if (($c = count($this->result_array)) > 0)
		{
			for ($i = 0; $i < $c; $i++)
			{
				$this->result_object[$i] = (object) $this->result_array[$i];
			}

			return $this->result_object;
		}

		is_null($this->row_data) OR $this->data_seek(0);
		while ($row = $this->_fetch_object())
		{
			$this->result_object[] = $row;
		}

		return $this->result_object;
	}

	// --------------------------------------------------------------------

	/**
	 * Query result. "array" version.
	 *
	 * @return	array
	 */
	public function result_array()
	{
		if (count($this->result_array) > 0)
		{
			return $this->result_array;
		}

		// In the event that query caching is on, the result_id variable
		// will not be a valid resource so we'll simply return an empty
		// array.
		if ( ! $this->result_id OR $this->num_rows === 0)
		{
			return array();
		}

		if (($c = count($this->result_object)) > 0)
		{
			for ($i = 0; $i < $c; $i++)
			{
				$this->result_array[$i] = (array) $this->result_object[$i];
			}

			return $this->result_array;
		}

		is_null($this->row_data) OR $this->data_seek(0);
		while ($row = $this->_fetch_assoc())
		{
			$this->result_array[] = $row;
		}

		return $this->result_array;
	}

	// --------------------------------------------------------------------

	/**
	 * Row
	 *
	 * A wrapper method.
	 *
	 * @param	mixed	$n
	 * @param	string	$type	'object' or 'array'
	 * @return	mixed
	 */
	public function row($n = 0, $type = 'object')
	{
		if ( ! is_numeric($n))
		{
			// We cache the row data for subsequent uses
			is_array($this->row_data) OR $this->row_data = $this->row_array(0);

			// array_key_exists() instead of isset() to allow for NULL values
			if (empty($this->row_data) OR ! array_key_exists($n, $this->row_data))
			{
				return NULL;
			}

			return $this->row_data[$n];
		}

		if ($type === 'object') return $this->row_object($n);
		elseif ($type === 'array') return $this->row_array($n);
		else return $this->custom_row_object($n, $type);
	}

	// --------------------------------------------------------------------

	/**
	 * Assigns an item into a particular column slot
	 *
	 * @param	mixed	$key
	 * @param	mixed	$value
	 * @return	void
	 */
	public function set_row($key, $value = NULL)
	{
		// We cache the row data for subsequent uses
		if ( ! is_array($this->row_data))
		{
			$this->row_data = $this->row_array(0);
		}

		if (is_array($key))
		{
			foreach ($key as $k => $v)
			{
				$this->row_data[$k] = $v;
			}
			return;
		}

		if ($key !== '' && $value !== NULL)
		{
			$this->row_data[$key] = $value;
		}
	}

	// --------------------------------------------------------------------

	/**
	 * Returns a single result row - custom object version
	 *
	 * @param	int	$n
	 * @param	string	$type
	 * @return	object
	 */
	public function custom_row_object($n, $type)
	{
		isset($this->custom_result_object[$type]) OR $this->custom_result_object($type);

		if (count($this->custom_result_object[$type]) === 0)
		{
			return NULL;
		}

		if ($n !== $this->current_row && isset($this->custom_result_object[$type][$n]))
		{
			$this->current_row = $n;
		}

		return $this->custom_result_object[$type][$this->current_row];
	}

	// --------------------------------------------------------------------

	/**
	 * Returns a single result row - object version
	 *
	 * @param	int	$n
	 * @return	object
	 */
	public function row_object($n = 0)
	{
		$result = $this->result_object();
		if (count($result) === 0)
		{
			return NULL;
		}

		if ($n !== $this->current_row && isset($result[$n]))
		{
			$this->current_row = $n;
		}

		return $result[$this->current_row];
	}

	// --------------------------------------------------------------------

	/**
	 * Returns a single result row - array version
	 *
	 * @param	int	$n
	 * @return	array
	 */
	public function row_array($n = 0)
	{
		$result = $this->result_array();
		if (count($result) === 0)
		{
			return NULL;
		}

		if ($n !== $this->current_row && isset($result[$n]))
		{
			$this->current_row = $n;
		}

		return $result[$this->current_row];
	}

	// --------------------------------------------------------------------

	/**
	 * Returns the "first" row
	 *
	 * @param	string	$type
	 * @return	mixed
	 */
	public function first_row($type = 'object')
	{
		$result = $this->result($type);
		return (count($result) === 0) ? NULL : $result[0];
	}

	// --------------------------------------------------------------------

	/**
	 * Returns the "last" row
	 *
	 * @param	string	$type
	 * @return	mixed
	 */
	public function last_row($type = 'object')
	{
		$result = $this->result($type);
		return (count($result) === 0) ? NULL : $result[count($result) - 1];
	}

	// --------------------------------------------------------------------

	/**
	 * Returns the "next" row
	 *
	 * @param	string	$type
	 * @return	mixed
	 */
	public function next_row($type = 'object')
	{
		$result = $this->result($type);
		if (count($result) === 0)
		{
			return NULL;
		}

		return isset($result[$this->current_row + 1])
			? $result[++$this->current_row]
			: NULL;
	}

	// --------------------------------------------------------------------

	/**
	 * Returns the "previous" row
	 *
	 * @param	string	$type
	 * @return	mixed
	 */
	public function previous_row($type = 'object')
	{
		$result = $this->result($type);
		if (count($result) === 0)
		{
			return NULL;
		}

		if (isset($result[$this->current_row - 1]))
		{
			--$this->current_row;
		}
		return $result[$this->current_row];
	}

	// --------------------------------------------------------------------

	/**
	 * Returns an unbuffered row and move pointer to next row
	 *
	 * @param	string	$type	'array', 'object' or a custom class name
	 * @return	mixed
	 */
	public function unbuffered_row($type = 'object')
	{
		if ($type === 'array')
		{
			return $this->_fetch_assoc();
		}
		elseif ($type === 'object')
		{
			return $this->_fetch_object();
		}

		return $this->_fetch_object($type);
	}

	// --------------------------------------------------------------------

	/**
	 * The following methods are normally overloaded by the identically named
	 * methods in the platform-specific driver -- except when query caching
	 * is used. When caching is enabled we do not load the other driver.
	 * These functions are primarily here to prevent undefined function errors
	 * when a cached result object is in use. They are not otherwise fully
	 * operational due to the unavailability of the database resource IDs with
	 * cached results.
	 */

	// --------------------------------------------------------------------

	/**
	 * Number of fields in the result set
	 *
	 * Overridden by driver result classes.
	 *
	 * @return	int
	 */
	public function num_fields()
	{
		return 0;
	}

	// --------------------------------------------------------------------

	/**
	 * Fetch Field Names
	 *
	 * Generates an array of column names.
	 *
	 * Overridden by driver result classes.
	 *
	 * @return	array
	 */
	public function list_fields()
	{
		return array();
	}

	// --------------------------------------------------------------------

	/**
	 * Field data
	 *
	 * Generates an array of objects containing field meta-data.
	 *
	 * Overridden by driver result classes.
	 *
	 * @return	array
	 */
	public function field_data()
	{
		return array();
	}

	// --------------------------------------------------------------------

	/**
	 * Free the result
	 *
	 * Overridden by driver result classes.
	 *
	 * @return	void
	 */
	public function free_result()
	{
		$this->result_id = FALSE;
	}

	// --------------------------------------------------------------------

	/**
	 * Data Seek
	 *
	 * Moves the internal pointer to the desired offset. We call
	 * this internally before fetching results to make sure the
	 * result set starts at zero.
	 *
	 * Overridden by driver result classes.
	 *
	 * @param	int	$n
	 * @return	bool
	 */
	public function data_seek($n = 0)
	{
		return FALSE;
	}

	// --------------------------------------------------------------------

	/**
	 * Result - associative array
	 *
	 * Returns the result set as an array.
	 *
	 * Overridden by driver result classes.
	 *
	 * @return	array
	 */
	protected function _fetch_assoc()
	{
		return array();
	}

	// --------------------------------------------------------------------

	/**
	 * Result - object
	 *
	 * Returns the result set as an object.
	 *
	 * Overridden by driver result classes.
	 *
	 * @param	string	$class_name
	 * @return	object
	 */
	protected function _fetch_object($class_name = 'stdClass')
	{
		return array();
	}

}
<?php
/**
 * CodeIgniter
 *
 * An open source application development framework for PHP
 *
 * This content is released under the MIT License (MIT)
 *
 * Copyright (c) 2014 - 2015, British Columbia Institute of Technology
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @package	CodeIgniter
 * @author	EllisLab Dev Team
 * @copyright	Copyright (c) 2008 - 2014, EllisLab, Inc. (http://ellislab.com/)
 * @copyright	Copyright (c) 2014 - 2015, British Columbia Institute of Technology (http://bcit.ca/)
 * @license	http://opensource.org/licenses/MIT	MIT License
 * @link	http://codeigniter.com
 * @since	Version 1.0.0
 * @filesource
 */
defined('BASEPATH') OR exit('No direct script access allowed');

$lang['ut_test_name'] = 'Test Name';
$lang['ut_test_datatype'] = 'Test Datatype';
$lang['ut_res_datatype'] = 'Expected Datatype';
$lang['ut_result'] = 'Result';
$lang['ut_undefined'] = 'Undefined Test Name';
$lang['ut_file'] = 'File Name';
$lang['ut_line'] = 'Line Number';
$lang['ut_passed'] = 'Passed';
$lang['ut_failed'] = 'Failed';
$lang['ut_boolean'] = 'Boolean';
$lang['ut_integer'] = 'Integer';
$lang['ut_float'] = 'Float';
$lang['ut_double'] = 'Float'; // can be the same as float
$lang['ut_string'] = 'String';
$lang['ut_array'] = 'Array';
$lang['ut_object'] = 'Object';
$lang['ut_resource'] = 'Resource';
$lang['ut_null'] = 'Null';
$lang['ut_notes'] = 'Notes';
